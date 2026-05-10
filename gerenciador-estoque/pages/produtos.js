import { useState, useEffect } from 'react'

export default function Home() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState(0)
  const [estoque, setEstoque] = useState(0)
  const [idFornecedor, setIdFornecedor] = useState('')
  const [idCategoria, setIdCategoria] = useState('')
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  
  // funções

  useEffect(() => {
    buscarProdutos()
    buscarCategorias()
    buscarFornecedores()
  }, [])

  // return com o HTML
  async function buscarProdutos(){
    const resposta = await fetch('/api/produtos')
    const dados = await resposta.json()
    setProdutos(dados)
  }

  async function buscarCategorias(){
    const resposta = await fetch('/api/categorias')
    const dados = await resposta.json()
    setCategorias(dados)
  }

  async function buscarFornecedores(){
    const resposta = await fetch('/api/fornecedores')
    const dados = await resposta.json()
    setFornecedores(dados)
  }

  async function criarProduto(){
    if(!nome || nome.trim() ==='' || !preco || !idFornecedor || !idCategoria) {
        alert("Nome, Preco, Estoque, idFornecedor, idCategoria são obrigatórios")
        return
    } else if(isNaN(preco) || isNaN(estoque)){
        alert("Certifique-se que Preço e Estoque sejam números")
        return
    }

    await fetch('/api/produtos', {
      method: 'POST',
      headers: { "Content-Type": 'application/json'},
      body: JSON.stringify({ nome, preco, estoque, idFornecedor, idCategoria })
    })

    setNome('')
    setPreco(0)
    setEstoque(0)
    setIdFornecedor('')
    setIdCategoria('')
    buscarProdutos()
    buscarCategorias()
    buscarFornecedores()
  }

  return(
      <div className="min-h-screen bg-gray-100 p-8">
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Registrar produto</h1>
            <div className='flex flex-col gap-3 mb-6'>

                <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={nome} onChange={(e) => setNome(e.target.value)} type='text' placeholder='Escolha o Nome'/>
                <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={preco} onChange={(e) => setPreco(e.target.value)} type='number'step="any" placeholder='Digite o valor'/>
                <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={estoque} onChange={(e) => setEstoque(e.target.value)} type='number' placeholder='Digite o estoque'/>

                <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' onChange={(e) => setIdFornecedor(e.target.value)}>
                    <option>Selecione um Fornecedor</option>
                        {fornecedores.map((f) => (
                            <option key={f.id} value={f.id}>{f.nome}</option>
                        ))}
                </select>

                <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' onChange={(e) => setIdCategoria(e.target.value)}>
                    <option>Selecione uma Categoria</option>
                        {categorias.map((c) => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                </select>

                <button className='bg-blue-500 rounded-lg text-white py-2 hover:bg-blue-600' onClick={criarProduto}>Criar produto</button>
            </div>

            <div className="produtos-lista">
                <h5 className='text-lg text-gray-700 font-semibold mb-3'>Produtos:</h5>
                <ul className='flex flex-col gap-2'>
                    {produtos.map((p) => (
                        <li className='border border-gray-200 rounded-lg px-4 py-3 text-gray-700' key={p.id}>{p.nome} - R${p.preco} - {p.estoque} unidades - {p.categoria.nome}</li>
                    ))}
                </ul>
            </div>
        </div>        
      </div>
    )
}