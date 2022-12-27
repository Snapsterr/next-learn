import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth"

import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { auth } from "../lib/firebase"

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUserEmail: (currentPassword: string, newEmail: string) => Promise<void>
  updateUserPassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>
  error: string | null
  loading: boolean
  isChanged: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  updateUserEmail: async () => {},
  updateUserPassword: async () => {},
  error: null,
  loading: false,
  isChanged: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [isChanged, setIsChanged] = useState<boolean>(false)

  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setError(null)
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push("/login")
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push("/")
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push("/")
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const updateUserEmail = async (currentPassword: string, newEmail: string) => {
    setLoading(true)
    setError(null)
    setIsChanged(false)
    if (user && user.email !== null) {
      let credential = EmailAuthProvider.credential(user.email, currentPassword)

      await reauthenticateWithCredential(user, credential)
        .then(async (userCredential) => {
          setUser(userCredential.user)
          await updateEmail(userCredential.user, newEmail)
            .then(() => {
              setIsChanged(true)
              toast(`email has been successfully changed on ${newEmail}`, {
                duration: 6000,
                style: toastStyle,
              })
            })
            .catch((error) => {
              // setError(error.message)
              console.log("error", error)
            })
        })
        .catch((error) => {
          setError(error.message)
          console.log("error", error)
        })
        .finally(() => setLoading(false))
    }
  }

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true)
    setIsChanged(false)
    if (user && user.email !== null) {
      let credential = EmailAuthProvider.credential(user.email, currentPassword)
      console.log("auth2", user)

      await reauthenticateWithCredential(user, credential)
        .then(async (userCredential) => {
          setUser(userCredential.user)
          await updatePassword(userCredential.user, newPassword)
            .then(() => {
              setIsChanged(true)
              toast(`password has been successfully changed`, {
                duration: 6000,
                style: toastStyle,
              })
            })
            .catch((error) => alert(error.message))
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      loading,
      error,
      updateUserEmail,
      updateUserPassword,
      isChanged,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
