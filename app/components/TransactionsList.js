"use client"

import { useFetch } from "@/hooks/useFetch"
import Loading from "./Loading"

export default function TransactionsList({ link, account }) {
  const { data, loading, error } = useFetch(`transactions?link=${link}&account=${account}`)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <span className="text-red-500">Error loading transactions: {error.message || error}</span>
  }

  return (
    <>
      <div className="flex justify-between border-2 p-4 rounded-xl border-black text-lg">
        <p className="font-medium">Balance</p>
        <p>${data.balance}</p>
      </div>

      <div className="overflow-y-auto max-h-[80vh] border-y border-gray-500">
        {data.results.map(transaction => (
          <div
            key={transaction.id}
            className="flex justify-between items-center border-y border-gray-500 py-2 px-4"
          >
            <div>
              <p className="text-sm">{new Date(transaction.created_at).toLocaleString()}</p>
              <p>{transaction.description}</p>
            </div>
            <p>
              {transaction.type == "INFLOW" ? "+" : "-"}
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
