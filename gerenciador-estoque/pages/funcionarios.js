import { useState, useEffect } from 'react'

export default function Home() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [cargo, setCargo] = useState('')
  const [funcionarios, setFuncionarios] = useState([])
  // funções

  useEffect(() => {
    buscarFuncionarios()
  }, [])

  // return com o HTML
  async function buscarFuncionarios(){
    const resposta = await fetch('/api/funcionarios')
    const dados = await resposta.json()
    setFuncionarios(dados)
  }

  async function criarFuncionario(){
    if(!nome || nome.trim() ==='' || !cpf || !cargo) {
        alert("Nome, CPF, Cargo são obrigatórios")
        return
    } else if(cpf.length !== 11){
        alert("CPF inválido")
        return
    }

    await fetch('/api/funcionarios', {
      method: 'POST',
      headers: { "Content-Type": 'application/json'},
      body: JSON.stringify({ nome, cpf, cargo })
    })

    setNome('')
    setCpf('')
    setCargo('')
    buscarFuncionarios()
  }

  return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Funcionários</h1>

      <div className="flex flex-col gap-3 mb-6">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
          placeholder="Nome"
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          type="text"
          placeholder="CPF"
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        >
            <option value={''}>Selecione um cargo</option>
            <option value={'Gerente'}>Gerente</option>
            <option value={'Estoquista'}>Estoquista</option>
            <option value={'Comprador'}>Comprador</option>
            <option value={'Supervisor'}>Supervisor</option>
            <option value={'Auxiliar de Estoque'}>Auxiliar de Estoque</option>
        </select>
        <button
          onClick={criarFuncionario}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Criar Funcionário
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-3">Funcionários cadastrados</h2>
      <ul className="flex flex-col gap-2">
        {funcionarios.map((f) => (
          <li key={f.id} className="border border-gray-200 rounded-lg px-4 py-3 text-gray-700">
            {f.nome} - {f.cargo}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
}