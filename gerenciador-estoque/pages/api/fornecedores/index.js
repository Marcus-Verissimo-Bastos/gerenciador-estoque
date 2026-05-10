const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const fornecedores = await prisma.fornecedor.findMany({
        orderBy: {id: 'desc'}
    })

    return res.status(200).json(fornecedores)
  }

  if (req.method === 'POST') {
    const { nome, cnpj, contato } = req.body

    if (!nome || nome.trim() === '' || !cnpj || cnpj.trim() === '' || !contato || contato.trim() === ''){
        return res.status(400).json({erro: "Campos NOME, CNPJ e CONTATO  são obrigatórios"})
    } else if(cnpj.length !== 14 ){
        return res.status(400).json({erro: "CNPJ tem que ter 14 dígitos"})
    } else {
        const fornecedor = await prisma.fornecedor.create({
            data:{ 
            nome,
            cnpj,
            contato           
            }
        }) 

        return res.status(201).json(fornecedor)
    }
  }  

  return res.status(405).json({error: "Método não permitido"})
}