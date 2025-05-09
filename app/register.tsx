import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import PressableView from "@/components/ui/PressableView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { auth } from "@/lib/firebase";
import { registerSchema } from "@/schemas/registerSchema";
import { registerUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";

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

  const router = useRouter();

  const { colors } = useTheme()

  const btnTextColor = useThemeColor({}, "buttonText")
  const errorColor = useThemeColor({}, "error")

  const { setDbUser, authError, setError } = useAuth()

  const register = async (data: RegisterFormData) => {
    const { email, username, firstName, lastName, profilePicUrl, password } = data
    setError(null)
    try {
      await AsyncStorage.setItem("isRegistering", "true");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      const idToken = await user.getIdToken()

      const response = await registerUser({ email, username, firstName, lastName, profilePicUrl, idToken })

      setDbUser(response)

      router.push("/")
    } catch (err) {
      setError(err)
    } finally {
      await AsyncStorage.removeItem("isRegistering");
    }
  };

  const goToLogin = () => {
    setError(null)
    router.push('/login')
  }

  return (
    <ThemedView mainContainer className="min-h-[100vh]">
      <ScrollView>
        <ThemedView className="items-center h-[100] justify-center">
          <ThemedText>LOGO</ThemedText>
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
        <ThemedView className="pb-[150px] flex-row justify-center mx-4 gap-x-2">
          <ThemedText>
            Already have an account?
          </ThemedText>
          <PressableView onPressFunc={() => { goToLogin() }}>
            <ThemedText
              lightColor={colors.primary}
              darkColor={colors.primary}
            >login</ThemedText>
          </PressableView>
        </ThemedView>
      </ScrollView>

      <ThemedView className="items-center px-4 absolute bottom-16 w-full">
        <CustomButton onPressFunc={handleSubmit(register)}>
          <ThemedText
            className="font-semibold text-center"
            lightColor={btnTextColor}
            darkColor={btnTextColor}
          >
            Register
          </ThemedText>
        </CustomButton>
      </ThemedView>

    </ThemedView>
  );
}