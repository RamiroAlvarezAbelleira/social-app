import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { ScrollView } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import CustomInput from "@/components/ui/CustomInput";
import { useRouter } from "expo-router";
import PressableView from "@/components/ui/PressableView";
import { useTheme } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import CustomButton from "@/components/ui/CustomButton";

type LoginFormData = {
  email: string;
  password: string
}

export default function LoginScreen() {
  const router = useRouter()
  const { colors } = useTheme()

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })


  const login = async (data: LoginFormData) => {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
    } catch (err) {
      console.error(err);
    }
  };
  
  const test = async (data: LoginFormData) => {
    console.log(data)
  };

  const goToRegister = () => {
    router.push('/register')
  }

  return (
    <ThemedView mainContainer className="min-h-[100vh]">
      <ThemedView className="items-center h-[100] justify-center">
        <ThemedText>LOGO</ThemedText>
      </ThemedView>
      <CustomInput
        name="email"
        placeholder="email@email.com"
        control={control}
        error={errors.email?.message}
      />
      <CustomInput
        name="password"
        placeholder="Enter password"
        control={control}
        error={errors.password?.message}
        secureTextEntry
      />
      <ThemedView className="flex-row justify-center mx-4 gap-x-2">
        <ThemedText>
          Don't have an account?
        </ThemedText>
        <PressableView onPressFunc={() => { goToRegister() }}>
          <ThemedText
            lightColor={colors.primary}
            darkColor={colors.primary}
          >Register</ThemedText>
        </PressableView>
      </ThemedView>

      <ThemedView className="items-center px-4 absolute bottom-16 w-full">
        <CustomButton onPressFunc={handleSubmit(test)}>
          <ThemedText
            className="font-semibold text-center"
            lightColor="#ECEDEE"
            darkColor="#11181C"
          >
            Login
          </ThemedText>
        </CustomButton>
      </ThemedView>

    </ThemedView>
  );
}