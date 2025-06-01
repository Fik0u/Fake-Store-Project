import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/NavBar";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.screen}>

      <View style={styles.navWrapper}>
        <Navbar />
      </View>


      <View style={styles.formWrapper}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <Button title="Log In" onPress={() => login(username, password, navigation)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',

  },
  formWrapper: {
    flex: 1,
    marginTop: 100,
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    color: '#5a4e9f',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#a68bff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#a68bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
