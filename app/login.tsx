import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemedView mainContainer>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Login" onPress={login} />
    </ThemedView>
  );
}