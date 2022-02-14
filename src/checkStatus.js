const Database = require('../src/database/db')

async function checkStatus() {
  try {
    const db = await Database

    const doacoes = await db.all(`
      SELECT * FROM doacao WHERE doacao.status NOT IN ('Expirada', 'Entregue')
    `)

    for (const doacao of doacoes) {
      const dataDoacao = (new Date(doacao.disponivel_ate)).getTime()
      const dataAtual = (new Date()).getTime()

      if (dataAtual > dataDoacao)
        await db.run(`
          UPDATE doacao
          SET status = "Expirada"
          WHERE cod_doacao = ${doacao.cod_doacao}
        `)
    }

    return;
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  checkStatus,
}