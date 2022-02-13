const Database = require('../database/db')

async function listAll(req, res) {
  try {
    const db = await Database

    const categorias = await db.all(`
      SELECT * FROM categoria
    `)

    // console.log(categorias)
    if (res) return res.status(200).json(categorias)
    else return categorias
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

module.exports = {
  listAll,
}