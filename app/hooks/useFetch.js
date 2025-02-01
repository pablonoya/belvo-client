"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export const useFetch = (endpoint, params) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/" + endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params,
        })

        if (response.status === 401) {
          router.push("/login")
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
