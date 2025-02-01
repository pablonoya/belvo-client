"use client"

import Image from "next/image"
import Link from "next/link"

import { useFetch } from "../hooks/useFetch"
import Loading from "./Loading"

export default function InstitutionsGrid() {
  const { data, loading, error } = useFetch("institutions")

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <span className="text-red-500">Error loading institutions: {error.message || error}</span>
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.results.map(institution => (
        <Link
          key={institution.id}
          href={`/institution/${institution.name}/accounts`}
          className="flex flex-col items-center rounded-lg border-2 py-4"
        >
          <Image
            src={institution.logo || "/favicon.ico"}
            width="300"
            height="100"
            alt={institution.display_name}
          />
          <p>{institution.display_name}</p>
        </Link>
      ))}
    </div>
  )
}
