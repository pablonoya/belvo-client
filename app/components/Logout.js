"use client"

import { useAuth } from "../context/AuthContext"
export default function Logout() {
  const { token, logout } = useAuth()

  return (
    token && (
      <button className="text-white bg-red-500 px-2 py-1 rounded-md" onClick={logout}>
        Cerrar sesión
      </button>
    )
  )
}
