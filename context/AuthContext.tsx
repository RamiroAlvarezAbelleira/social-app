import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loginUser } from '@/services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { UserType } from '@/types/user.types';
import { FirebaseError } from 'firebase/app';


type AuthContextType = {
  user: User | null;
  dbUser: UserType | null;
  authError: string | null;
  isLoading: boolean;
  logout: () => void,
  setDbUser: (user: UserType | null) => void;
  setError: (error: any | unknown) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  authError: null,
  isLoading: true,
  logout: () => { },
  setDbUser: () => { },
  setError: () => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<UserType | null>(null);
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  const setError = (err: any | unknown) => {
    if (!err) {
      setAuthError(null)
    } else if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setAuthError("Wrong email or password");
          break;
        case "auth/too-many-requests":
          setAuthError("To many requests. Try again later");
          break;
        default:
          setAuthError("Something went wrong");
      }
    } else {
      setAuthError("Unexpected error");
    }
  }

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setDbUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      const isRegistering = await AsyncStorage.getItem("isRegistering");
      if (firebaseUser && !isRegistering) {
        const idToken = await firebaseUser.getIdToken()
        try {
          const response = await loginUser({ idToken })
          setUser(firebaseUser);
          setDbUser(response)
        } catch (error) {
          console.error("User not found", error)
          setUser(null)
          setDbUser(null)
        }
      } else {
        setUser(null)
        setDbUser(null)
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, dbUser, authError, isLoading, logout, setDbUser, setError }}>
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);