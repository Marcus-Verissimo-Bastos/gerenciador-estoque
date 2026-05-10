const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const funcionarios = await prisma.funcionario.findMany({
        orderBy: {id: 'desc'}
    })

    return res.status(200).json(funcionarios)
  }

  if (req.method === 'POST') {
    const { nome, cpf, cargo } = req.body

    if (!nome || nome.trim() === '' || !cpf || cpf.trim() === '' || !cargo || cargo.trim() === ''){
        return res.status(400).json({erro: "Campos NOME, CPF e CARGO  são obrigatórios"})
    } else if(cpf.length !== 11 ){
        return res.status(400).json({erro: "CPF tem que ter 11 dígitos"})
    } else {
        const funcionario = await prisma.funcionario.create({
            data:{ 
            nome,
            cpf,
            cargo           
            }
        }) 

        return res.status(201).json(funcionario)
    }
  }  

  return res.status(405).json({error: "Método não permitido"})
}