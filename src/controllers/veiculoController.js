const Database = require('../database/db')
const { createVeiculo } = require('../database/index')

async function listAll(req, res) {
  const { cod_volunt } = req.query

  try {
    const db = await Database

    const veiculos = await db.all(`
    SELECT * FROM veiculo
    WHERE veiculo.cod_volunt = ${cod_volunt}
    `)

    // console.log(veiculos)
    if (res) return res.status(200).json(veiculos)
    else return veiculos
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

async function update(req, res) {
  console.log(req.body)
  const { veiculos, cod_volunt } = req.body

  try {
    const db = await Database

    for (const item of veiculos) {
      if (item.cod_veiculo && item.cod_veiculo != '') {
        await db.run(`
          UPDATE veiculo
          SET
            placa = '${item.placa}',
            ano = ${item.ano},
            marca = '${item.marca}',
            modelo = '${item.modelo}'
          WHERE cod_veiculo = ${item.cod_veiculo};
        `)
      } else {
        const veiculoValue = {
          placa: item.placa,
          marca: item.marca,
          modelo: item.modelo,
          ano: item.ano,
        };

        await createVeiculo(db, { voluntario_id: cod_volunt, veiculoValue })
      }
    }

    if (res) return res.status(200).json({ msg: 'Atualizado com sucesso!' })
    else return { msg: 'Atualizado com sucesso!' }

  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'UPDATE ERROR' })
    else throw error
  }
}

module.exports = {
  listAll,
  update,
}