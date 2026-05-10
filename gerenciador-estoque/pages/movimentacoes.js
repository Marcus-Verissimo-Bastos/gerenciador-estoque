import { useState, useEffect } from 'react'

export default function Home() {
  const [tipo, setTipo] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [dataMovimentacao, setDataMovimentacao] = useState(0)
  const [idProduto, setIdProduto] = useState('')
  const [idFuncionario, setIdFuncionario] = useState('')
  const [produtos, setProdutos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [movimentacoes, setMovimentacoes] = useState([])
  
  // funções

  useEffect(() => {
    buscarMovimentacoes()
    buscarFuncionarios()
    buscarProdutos()
  }, [])

  // return com o HTML
  async function buscarMovimentacoes(){
    const resposta = await fetch('/api/movimentacoes')
    const dados = await resposta.json()
    setMovimentacoes(dados)
  }

  async function buscarFuncionarios(){
    const resposta = await fetch('/api/funcionarios')
    const dados = await resposta.json()
    setFuncionarios(dados)
  }

  async function buscarProdutos(){
    const resposta = await fetch('/api/produtos')
    const dados = await resposta.json()
    setProdutos(dados)
  }

  async function criarMovimentacao(){
    if(!tipo || tipo.trim() ==='' || !quantidade || !dataMovimentacao || !idProduto || !idFuncionario) {
        alert("Tipo, Quantidade, dataMovimentacao, idProduto, idFuncionario são obrigatórios")
        return
    } else if(isNaN(quantidade)){
        alert("Certifique-se que Quantidade seja válida")
        return
    }

    await fetch('/api/movimentacoes', {
      method: 'POST',
      headers: { "Content-Type": 'application/json'},
      body: JSON.stringify({ tipo, quantidade, dataMovimentacao, idProduto, idFuncionario })
    })

    setTipo('')
    setQuantidade('')
    setDataMovimentacao('')
    setIdProduto('')
    setIdFuncionario('')
    buscarProdutos()
    buscarFuncionarios()
    buscarMovimentacoes()
  }

  return(
      <div className="min-h-screen bg-gray-100 p-8">
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Registrar Movimentação</h1>
            <div className='flex flex-col gap-3 mb-6'>
                <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' onChange={(e) => setIdProduto(e.target.value)}>
                    <option>Selecione um Produto</option>
                        {produtos.map((p) => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                        ))}
                </select>
                <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={quantidade} onChange={(e) => setQuantidade(e.target.value)} type='number'step="any" placeholder='Digite a quantidade'/>
                <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' value={dataMovimentacao} onChange={(e) => setDataMovimentacao(e.target.value)} type='date' placeholder='Digite a data'/>

                <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' onChange={(e) => setTipo(e.target.value)}>
                    <option>Selecione o Tipo</option>
                    <option value={'entrada'}>Entrada</option>
                    <option value={'saida'}>Saída</option>
                </select>

                
                <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500' onChange={(e) => setIdFuncionario(e.target.value)}>
                    <option>Selecione um Funcionario</option>
                        {funcionarios.map((f) => (
                            <option key={f.id} value={f.id}>{f.nome} - {f.cargo}</option>
                        ))}
                </select>

                <button className='bg-blue-500 rounded-lg text-white py-2 hover:bg-blue-600' onClick={criarMovimentacao}>Criar movimentação</button>
            </div>
            

            <div className="produtos-lista">
                <h5 className='text-lg text-gray-700 font-semibold mb-3'>Movimentações:</h5>
                <ul className='flex flex-col gap-2'>
                    {movimentacoes.map((m) => (
                        <li className='border border-gray-200 rounded-lg px-4 py-3 text-gray-700' key={m.id}>{m.tipo} em {new Date(m.dataMovimentacao).toLocaleDateString('pt-BR')} de {m.quantidade} do produto {m.produto.nome}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>        
    )
}