import TransactionsList from "@/app/components/TransactionsList"
import BackButton from "@/app/components/BackButton"

export default async function Transactions({ searchParams }) {
  const { link, account } = await searchParams

  return (
    <div className="flex flex-col gap-4">
      <div className="flex space-x-2">
        <BackButton />
        <h1 className="text-2xl font-bold">Transacciones</h1>
      </div>

      <TransactionsList link={link} account={account} />
    </div>
  )
}
