import { useState, useEffect } from 'react'

export default function Home() {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [contato, setContato] = useState('')
  const [fornecedores, setFornecedores] = useState([])
  // funções

  useEffect(() => {
    buscarFornecedores()
  }, [])

  // return com o HTML
  async function buscarFornecedores(){
    const resposta = await fetch('/api/fornecedores')
    const dados = await resposta.json()
    setFornecedores(dados)
  }

  async function criarFornecedores(){
    if(!nome || nome.trim() ==='' || !cnpj || !contato) {
        alert("Nome, CNPJ, Contato são obrigatórios")
        return
    } else if(isNaN(cnpj) || cnpj.length !== 14){
        alert("CNPJ inválido")
        return
    }

    await fetch('/api/fornecedores', {
      method: 'POST',
      headers: { "Content-Type": 'application/json'},
      body: JSON.stringify({ nome, cnpj, contato })
    })

    setNome('')
    setCnpj('')
    setContato('')
    buscarFornecedores()
  }

  return(
      <div className="min-h-screen bg-gray-100 p-8">
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto flex"'>
          <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Registre um fornecedor</h1>
          <div className='flex flex-col gap-3 mb-6'>
            <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={nome} onChange={(e) => setNome(e.target.value)} type='text' placeholder='Escolha o Nome'/>
            <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={cnpj} onChange={(e) => setCnpj(e.target.value)} type='text' placeholder='Digite o CNPJ'/>
            <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={contato} onChange={(e) => setContato(e.target.value)} type='text' placeholder='Digite o Contato'/>

            <button className='bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600' onClick={criarFornecedores}>Criar fornecedor</button>
          </div>

          <div className="fornecedores-lista">
              <h5 className='text-lg font-semibold text-gray-700 mb-3'>Fornecedores:</h5>
              <ul className='flex flex-col gap-2'>
                  {fornecedores.map((f) => (
                      <li className='border border-gray-200 rounded-lg px-4 py-3 text-gray-700' key={f.id}>{f.nome}</li>
                  ))}
              </ul>
          </div>
        </div>
      </div>    
    )
}