import { setDefaultResultOrder } from "dns"
import {
  createUserWithEmailAndPassword,
  EmailAuthCredential,
  EmailAuthProvider,
  getAuth,
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
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)

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
    if (user && user.email !== null) {
      let credential = EmailAuthProvider.credential(user.email, currentPassword)
      console.log("auth2", user)

      await reauthenticateWithCredential(user, credential)
        .then(async (userCredential) => {
          setUser(userCredential.user)
          await updateEmail(userCredential.user, newEmail).catch((error) => {
            setError(error.message)
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
    if (user && user.email !== null) {
      let credential = EmailAuthProvider.credential(user.email, currentPassword)
      console.log("auth2", user)

      await reauthenticateWithCredential(user, credential)
        .then(async (userCredential) => {
          setUser(userCredential.user)
          await updatePassword(userCredential.user, newPassword).catch(
            (error) => alert(error.message)
          )
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
