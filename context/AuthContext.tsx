import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loginUser } from '@/services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { UserType } from '@/types/user.types';


type AuthContextType = {
  user: User | null;
  dbUser: UserType | null;
  isLoading: boolean;
  logout: () => void,
  setDbUser: (user: UserType | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  isLoading: true,
  logout: () => { },
  setDbUser: () => { }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setDbUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      console.log("entre al unsubscribe")
      const isRegistering = await AsyncStorage.getItem("isRegistering");
      if (firebaseUser && !isRegistering) {
        console.log("entre al if")
        const idToken = await firebaseUser.getIdToken()
        console.log("token", idToken)
        try {
          const response = await loginUser({ idToken })
          console.log(response)
          setDbUser(response)
        } catch (error) {
          console.error("User not found", error)
          setDbUser(null)
        }

      } else {
        setDbUser(null)
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, dbUser, isLoading, logout, setDbUser }}>
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);