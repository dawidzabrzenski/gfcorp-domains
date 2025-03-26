import Table from 'components/Table'

export default function App() {
  return (
    <div className="bg-dark-mainbg text-white w-full min-h-screen p-4 flex flex-col">
      <h1 className="text-4xl font-semibold mb-4">Domeny GFCorp</h1>
      <div className="flex-grow w-full">
        <Table />
      </div>
    </div>
  )
}
