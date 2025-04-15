import { ThemedView } from "@/components/ui/ThemedView";
import { auth } from "@/lib/firebase";
import { registerUser } from "@/services/users";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, TextInput } from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      const idToken = await user.getIdToken()

      const response = await registerUser({ email, username, firstName, lastName, profilePicUrl, idToken })
      console.log("User registered", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemedView mainContainer>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="username" onChangeText={setUsername} value={username} />
      <TextInput placeholder="First Name" onChangeText={setFirstName} value={firstName} />
      <TextInput placeholder="Last Name" onChangeText={setLastName} value={lastName} />
      <TextInput placeholder="Profile Pic Url" onChangeText={setProfilePicUrl} value={profilePicUrl} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Register" onPress={register} />
    </ThemedView>
  );
}