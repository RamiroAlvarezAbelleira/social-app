import { User } from "firebase/auth"
import { useEffect, useState } from "react"

const useIdToken = (firebaseUser: User | null) => {
    const [idToken, setIdToken] = useState<string>("")
    const setIdTokenAsync = async () => {
        setIdToken("")
        if (firebaseUser) {
            const token = await firebaseUser?.getIdToken()
            setIdToken(token)
        }
    }

    useEffect(() => {
        if (firebaseUser) {
            setIdTokenAsync()
        }
    }, [firebaseUser])

    return idToken
}

export default useIdToken