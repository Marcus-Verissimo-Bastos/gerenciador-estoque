import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Gerenciador de Estoque
        </h1>
        <p className="text-gray-500 mb-8">Selecione uma função</p>

        <div className="flex flex-col gap-3">
          <Link href="/produtos" className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600">
            Produtos
          </Link>
          <Link href="/funcionarios" className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600">
            Funcionários
          </Link>
          <Link href="/movimentacoes" className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600">
            Movimentações
          </Link>
          <Link href="/fornecedores" className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600">
            Fornecedores
          </Link>
          <Link href="/categorias" className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600">
            Categorias
          </Link>
        </div>
      </div>
    </div>
  )
}