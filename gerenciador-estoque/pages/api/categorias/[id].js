const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { idCategoria } = req.query

    const categoriaDeletada = await prisma.categoria.delete({
        where: {id: Number(idCategoria)}
    })

    return res.status(200).json(categoriaDeletada)
  }

  return res.status(405).json({error: "Método não permitido"})
}