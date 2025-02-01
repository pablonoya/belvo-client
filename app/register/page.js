"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const [error, setError] = useState("")

  const { login } = useAuth()
  const handleSubmit = async (previousState, formData) => {
    const username = formData.get("username")
    const password = formData.get("password")

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        login(data.username, data.password)
      }
    } catch (error) {
      setError(error)
    } finally {
      setError("")
    }
  }

  const [state, formAction] = useActionState(handleSubmit, {
    username: "",
    password: "",
  })

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="p-8 space-y-4 md:space-y-6 border-2 border-black rounded-lg">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Regístrate
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4 md:space-y-6" action={formAction}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="usuario"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Regístrate
          </button>
          <p className="text-sm font-light text-gray-700 ">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href={"/login"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
