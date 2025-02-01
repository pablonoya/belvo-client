"use client"

import Link from "next/link"
import { useActionState } from "react"

import { useAuth } from "../context/AuthContext"

export default function LoginForm() {
  const { error, login } = useAuth()

  const handleSubmit = (previousState, formData) => {
    login(formData.get("username"), formData.get("password"))
  }

  const [state, formAction] = useActionState(handleSubmit, {
    username: "",
    password: "",
  })

  return (
    <div className="p-8 space-y-4 md:space-y-6 border-2 border-black rounded-lg">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
        Inicia sesión
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
          Iniciar sesión
        </button>
        <p className="text-sm font-light text-gray-700 ">
          ¿No tienes una cuenta?{" "}
          <Link
            href={"/register"}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  )
}
