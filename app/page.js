import InstitutionsGrid from "./components/InstitutionsGrid"

export default function Institutions() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Instituciones</h1>
      <InstitutionsGrid />
    </div>
  )
}
