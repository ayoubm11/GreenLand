
# 🌱 GreenLand – Système d'Arrosage Automatique Intelligent

![React Native](https://img.shields.io/badge/React--Native-Mobile--App-blue?logo=react)
![ESP32](https://img.shields.io/badge/ESP32-IoT-green?logo=arduino)
![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow?logo=firebase)
![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

---

## 🌟 Aperçu de l'application
<p align="center">
  <img src="demo/demo11.gif" alt="Démo de l'application" width="350"/>
</p>


---

## 📱 Description du projet

**GreenLand** est une solution d’irrigation intelligente combinant une application mobile (React Native) et un système embarqué ESP32. Elle permet :

- Suivi de l’humidité du sol en temps réel 🌱
- Arrosage automatique ou manuel 💧
- Localisation du dispositif 📍
- Blocage automatique de l’arrosage en cas de pluie prévue ☁️🌧
- Réglage à distance du seuil d’humidité 📊

---

## 🧠 Fonctionnement

```
[Capteur d'humidité] --(analogique)--> [ESP32]
       |
       v
[ESP32] <---> [Application Mobile React Native]
       |
       v
    [Pompe à eau]
```

- L’ESP32 lit le capteur toutes les secondes.
- Si l’humidité < seuil, la pompe s’active automatiquement.
- L’utilisateur peut également déclencher manuellement.
- En cas de pluie prévue : l’application bloque l’arrosage et notifie l’utilisateur.

---

## 🔧 Technologies utilisées

| Côté Matériel | Côté Application |
|---------------|------------------|
| ESP32         | React Native (Expo) |
| Capteur capacitif | Firebase Auth |
| Relais 5V     | API météo (simulée / réelle) |
| Pompe à eau   | React Native Maps |
| Alim 12V → 5V | Victory Charts |

---

## 📂 Structure du projet

```
📁 /components
   ├─ AppHeader.js
   ├─ WeatherWidget.js
   ├─ HumidityChart.js
   ├─ MapViewWidget.js
   ├─ WaterButton.js
   └─ HumidityThresholdSlider.js

📁 /screens
   ├─ LoginScreen.js
   ├─ RegisterScreen.js
   └─ HelpScreen.js

📁 /firebase
   └─ firebaseConfig.js

📄 App.js
```

---

## 🚀 Installation

### 🧩 Côté application mobile

```bash
git clone https://github.com/ton-utilisateur/greenland.git
cd greenland
npm install
npx expo start
```

### 🔌 Côté ESP32 (Arduino IDE)

- Installer les bibliothèques :
  - `WiFi.h`
  - `WebServer.h`
  - `ArduinoJson.h`
- Flasher le code sur ESP32
- Connecter les composants (capteur → GPIO32, pompe → GPIO33 via relais)

---

## 📲 Fonctionnalités de l’application

- 📉 Affichage du taux d’humidité
- 📍 Localisation du système
- ⚙️ Réglage du seuil d’arrosage
- 🌧 Détection de pluie à venir (simulation/API)
- 💦 Contrôle manuel ou automatique de la pompe
- 🔐 Authentification sécurisée avec Firebase

---

## 🧪 Testé sur

- ✅ Android 10+ (via Expo Go)
- ✅ ESP32 DevKit v1
- ✅ Capteur capacitif V1.2

---

## 👨‍💻 Auteurs
- 🧑‍💻 Mouradi Ayoub

---

