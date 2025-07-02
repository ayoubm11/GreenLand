import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import SocialLoginButtons from '../components/SocialLoginButtons';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 👉 Authentification Google avec expo-auth-session
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '569973363822-4npdflif4phujf6l9oqfmh5qcfqnn7jf.apps.googleusercontent.com',
    androidClientId: '569973363822-hmdcqgoievo7fu49fkjsvg8me9sj1401.apps.googleusercontent.com',
    iosClientId: '569973363822-pc7939pigccg33gma6c2f10kkrnuq8ki.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(err =>
        setError("Échec de connexion avec Google")
      );
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Main'); // Redirige après succès
    } catch (e) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GreenLand</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Se connecter" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 20 }}>
        <Button
          title="Connexion avec Google"
          onPress={() => promptAsync()}
          disabled={!request}
          color="#DB4437"
        />
      </View>

      {/* Prévoir les autres boutons (ajoute les handlers plus tard) */}
      <SocialLoginButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2e7d32'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  link: { color: '#0066cc', marginTop: 15, textAlign: 'center' }
});
