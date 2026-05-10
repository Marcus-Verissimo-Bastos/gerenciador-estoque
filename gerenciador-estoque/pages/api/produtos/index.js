const { traceId } = require('next/dist/trace/shared')
const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const produtos = await prisma.produto.findMany({
        orderBy: {id: 'desc'},
        include: {
          categoria: true,
          fornecedor: true
        }
    })

    return res.status(200).json(produtos)
  }

  if (req.method === 'POST') {
    const { nome, preco, estoque, idFornecedor, idCategoria } = req.body

    if (!nome || nome.trim() === '' || !preco || !idFornecedor || !idCategoria){
        return res.status(400).json({erro: "Campos NOME, PRECO, IDFORNECEDOR, IDCATEGORIA são obrigatórios"})
    } else if(isNaN(preco) || Number(preco) <= 0 ){
        return res.status(400).json({erro: "Campo PRECO inválido"})
    } else{
        const produto = await prisma.produto.create({
            data:{ 
            nome, 
            preco: Number(preco),
            estoque: Number(estoque),
            idFornecedor: Number(idFornecedor),
            idCategoria: Number(idCategoria)       
            }
        }) 

        return res.status(201).json(produto)
    }
  }  

  return res.status(405).json({error: "Método não permitido"})
}