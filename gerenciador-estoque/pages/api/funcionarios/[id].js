const prisma = require('../../../lib/prisma')

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { idFuncionario } = req.query

    const funcionarioDeletado = await prisma.funcionario.delete({
        where: {id: Number(idFuncionario)}
    })

    return res.status(200).json(funcionarioDeletado)
  }

  return res.status(405).json({error: "Método não permitido"})
}