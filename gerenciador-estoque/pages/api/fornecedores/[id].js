const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { idFornecedor } = req.query

    const fornecedorDeletado = await prisma.fornecedor.delete({
        where: {id: Number(idFornecedor)}
    })

    return res.status(200).json(fornecedorDeletado)
  }

  return res.status(405).json({error: "Método não permitido"})
}