import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import PressableView from "@/components/ui/PressableView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { auth } from "@/lib/firebase";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string
}

export default function LoginScreen() {
  const router = useRouter()
  const { colors } = useTheme()
  const btnTextColor = useThemeColor({}, "buttonText")
  const errorColor = useThemeColor({}, "error")

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const { authError, setError } = useAuth()

  const login = async (data: LoginFormData) => {
    const { email, password } = data
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
      router.push("/")
    } catch (err) {
      setError(err)
    }
  };

  const goToRegister = () => {
    setError(null)
    router.push('/register')
  }

  return (
    <ThemedView mainContainer className="min-h-[100vh]">
      <ThemedView className="items-center h-[100] justify-center">
        <ThemedText type="title">Social App</ThemedText>
      </ThemedView>
      {
        authError &&
        <ThemedText
          lightColor={errorColor}
          darkColor={errorColor}
          className="text-center"
          type="defaultSemiBold"
        >
          {authError}
        </ThemedText>
      }
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
        <CustomButton onPressFunc={handleSubmit(login)}>
          <ThemedText
            className="font-semibold text-center"
            lightColor={btnTextColor}
            darkColor={btnTextColor}
          >
            Login
          </ThemedText>
        </CustomButton>
      </ThemedView>

    </ThemedView>
  );
}