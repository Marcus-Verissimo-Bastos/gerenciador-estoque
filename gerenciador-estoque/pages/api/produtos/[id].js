const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { idProduto } = req.query

    const produtoDeletado = await prisma.produto.delete({
        where: {id: Number(idProduto)}
    })

    return res.status(200).json(produtoDeletado)
  }

  return res.status(405).json({error: "Método não permitido"})
}