import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function SocialLoginButtons() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '569973363822-hmdcqgoievo7fu49fkjsvg8me9sj1401.apps.googleusercontent.com',
    iosClientId: '569973363822-pc7939pigccg33gma6c2f10kkrnuq8ki.apps.googleusercontent.com',
    expoClientId: '569973363822-4npdflif4phujf6l9oqfmh5qcfqnn7jf.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => console.log("Connexion Google réussie"))
        .catch(err => Alert.alert("Erreur", err.message));
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoogleLogin}>
        <Image source={require('../assets/google.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Facebook / GitHub / Phone peuvent être ajoutés ensuite */}
      <TouchableOpacity onPress={() => Alert.alert("À venir", "Connexion Facebook à implémenter")}>
        <Image source={require('../assets/facebook.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert("À venir", "Connexion GitHub à implémenter")}>
        <Image source={require('../assets/github.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert("À venir", "Connexion téléphone à implémenter")}>
        <Image source={require('../assets/phone.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  icon: { width: 40, height: 40 }
});
