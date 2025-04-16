import CustomInput from "@/components/ui/CustomInput";
import { ThemedView } from "@/components/ui/ThemedView";
import { auth } from "@/lib/firebase";
import { registerSchema } from "@/schemas/registerSchema";
import { registerUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Button } from "react-native";

type RegisterFormData = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  password: string;
};

export default function RegisterScreen() {

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const register = async (data: RegisterFormData) => {
    const { email, username, firstName, lastName, profilePicUrl, password } = data
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

  const test = (data: RegisterFormData) => {
    console.log(data)
  }

  return (
    <ThemedView mainContainer>
      <CustomInput
        name="email"
        placeholder="email@email.com"
        control={control}
        error={errors.email?.message}
      />
      <CustomInput
        name="username"
        placeholder="Enter username"
        control={control}
        error={errors.username?.message}
      />
      <CustomInput
        name="firstName"
        placeholder="Enter firstname"
        control={control}
        error={errors.firstName?.message}
      />
      <CustomInput
        name="lastName"
        placeholder="Enter lastname"
        control={control}
        error={errors.lastName?.message}
      />
      <CustomInput
        name="profilePicUrl"
        placeholder="Enter profile photo url"
        control={control}
        error={errors.profilePicUrl?.message}
      />
      <CustomInput
        name="password"
        placeholder="Enter password"
        control={control}
        error={errors.password?.message}
        secureTextEntry
      />
      <Button title="Register" onPress={handleSubmit(test)} />
    </ThemedView>
  );
}