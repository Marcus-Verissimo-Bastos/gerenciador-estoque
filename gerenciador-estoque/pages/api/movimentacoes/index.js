const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const movimentacoes = await prisma.movimentacao.findMany({
        orderBy: {id: 'desc'},
        include: {
            produto: true,
            funcionario: true            
        }
    })

    return res.status(200).json(movimentacoes)
  }

  if (req.method === 'POST') {
    const { tipo, quantidade, dataMovimentacao, idProduto, idFuncionario } = req.body
    const validDate = new Date(dataMovimentacao)
    if (!tipo || tipo.trim() === '' || !quantidade || !dataMovimentacao || !idProduto || !idFuncionario){
        return res.status(400).json({erro: "Campos TIPO, QUANTIDADE, DATAMOVIMENTACAO, IDPRODUTO e IDFUNCIONARIO são obrigatórios"})
    } else if(isNaN(quantidade) || Number(quantidade) <= 0){
        return res.status(400).json({erro: "Campo QUANTIDADE inválido"})
    } else if(isNaN(validDate)){
        return res.status(400).json({erro: "Campo DATAMOVIMENTACAO inválido"})
    }else{
        const movimentacao = await prisma.movimentacao.create({
            data:{ 
            tipo, 
            quantidade: Number(quantidade),
            dataMovimentacao: new Date(dataMovimentacao),
            idProduto: Number(idProduto),
            idFuncionario: Number(idFuncionario)           
            }
        }) 

        const produto = await prisma.produto.findUnique({
            where: {id: Number(idProduto)}
        })

        const novoEstoque = tipo === 'entrada' ? produto.estoque + Number(quantidade) : produto.estoque - Number(quantidade)

        await prisma.produto.update({
            where: {id: Number(idProduto)},
            data: {estoque: novoEstoque}
        })

        return res.status(201).json(movimentacao)
    }
  }  

  return res.status(405).json({error: "Método não permitido"})
}