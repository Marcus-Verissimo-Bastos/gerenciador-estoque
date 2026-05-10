const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const categorias = await prisma.categoria.findMany({
        orderBy: {id: 'desc'},
    })

    return res.status(200).json(categorias)
  }

  if (req.method === 'POST') {
    const { nome } = req.body

    if (!nome || nome.trim() === ''){
        return res.status(400).json({erro: "Campo NOME é obrigatório"})
    } else {
        const categoria = await prisma.categoria.create({
            data:{ 
            nome,            
            }
        }) 

        return res.status(201).json(categoria)
    }
  }  

  return res.status(405).json({error: "Método não permitido"})
}