import { useState, useEffect } from 'react'

export default function Home() {
  const [nome, setNome] = useState('')
  const [categorias, setCategorias] = useState([])
  // funções

  useEffect(() => {
    buscarCategorias()
  }, [])

  // return com o HTML
  async function buscarCategorias(){
    const resposta = await fetch('/api/categorias')
    const dados = await resposta.json()
    setCategorias(dados)
  }

  async function criarCategoria(){
    if(!nome || nome.trim() ==='') {
        alert("Nome é obrigatório")
        return
    }

    await fetch('/api/categorias', {
      method: 'POST',
      headers: { "Content-Type": 'application/json'},
      body: JSON.stringify({ nome })
    })

    setNome('')
    buscarCategorias()
  }

  return(
      <div className="min-h-screen bg-gray-100 p-8">        
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Criar categoria</h1>
            <div className='flex flex-col gap-3 mb-6'>
                <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={nome} onChange={(e) => setNome(e.target.value)} type='text' placeholder='Escolha o Nome'/>

                <button className='bg-blue-500 rounded-lg text-white py-2 hover:bg-blue-600' onClick={criarCategoria}>Criar categoria</button>
            </div>

            <div className="categorias-lista">
                <h5 className='text-lg text-gray-700 font-semibold mb-3'>Categorias:</h5>
                <ul className='flex flex-col gap-2'>
                    {categorias.map((c) => (
                        <li className='border border-gray-200 rounded-lg px-4 py-3 text-gray-700' key={c.id}>{c.nome}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    )
}