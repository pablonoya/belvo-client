"use client"
import Link from "next/link"

import { useFetch } from "@/hooks/useFetch"
import Loading from "./Loading"

export default function AccountsGrid({ institution }) {
  const { data, loading, error } = useFetch("accounts", { institution })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <span className="text-red-500">Error loading account: {error.message || error}</span>
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.results.map(account => (
        <Link
          href={`/transactions?link=${account.link}&account=${account.id}`}
          key={account.id}
          className="border-2 border-gray-400 p-4 rounded-lg flex flex-col gap-1"
        >
          <p className="font-bold text-lg">{account.name}</p>
          <p>
            ${account.balance.current} {account.currency}
          </p>
        </Link>
      ))}
    </div>
  )
}
