import AccountsGrid from "@/app/components/AccountsGrid"
import BackButton from "@/app/components/BackButton"

export default async function Accounts({ params }) {
  const { slug } = await params

  return (
    <div className="flex flex-col gap-4">
      <div className="flex space-x-2">
        <BackButton />
        <h1 className="text-2xl font-bold">Cuentas</h1>
      </div>
      <AccountsGrid institution={slug} />
    </div>
  )
}
