"use client"

import { createContext, useContext, useState, useEffect } from "react"

import { useRouter } from "next/navigation"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(JSON.parse(token))
    }
  }, [])

  const login = async (username, password) => {
    let formData = new FormData()

    formData.append("username", username)
    formData.append("password", password)

    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      body: formData,
    })

    if (response.status == 401) {
      setError("Usuario o contraseña incorrectos.")
    }

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("token", JSON.stringify(data))
      setUser(data)
      setError("")
      router.push("/")
    }
  }

  const logout = async () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
