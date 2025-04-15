import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemedView mainContainer>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Register" onPress={register} />
    </ThemedView>
  );
}