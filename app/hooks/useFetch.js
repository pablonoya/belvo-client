"use client"

import { useState, useEffect } from "react"

import { useAuth } from "../context/AuthContext"

export const useFetch = (endpoint, params) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { logout } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BELVO_CLIENT_URL}/${endpoint}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params,
        })

        if (response.status === 401) {
          logout()
        }

        if (response.ok) {
          const json = await response.json()
          setData(json)
        } else {
          setError(response.statusText)
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}
