const Database = require('../database/db')
const { createDoacao } = require('../database/index')

function adicionaZero(numero) {
  return numero < 9 ? `0${numero}` : `${numero}`
}

async function register(req, res) {
  //adicionar dados a lista de doacoes
  console.log(req.body)

  const data = new Date()
  const data_criacao = adicionaZero(data.getDate()) + "/" + adicionaZero(data.getMonth()) + "/" + adicionaZero(data.getFullYear())

  const doacaoValue = {
    descricao: req.body.descricao,
    quantidade: req.body.quantidade,
    cod_categ: parseInt(req.body.cod_categ),
    cod_doador: parseInt(req.body.cod_doador),
    cod_institu: parseInt(req.body.cod_institu),
    rua: req.body.rua,
    numero: req.body.numero,
    bairro: req.body.bairro,
    data_criacao,
    disponivel_ate: req.body.disponivel_ate
  };

  try {
    const db = await Database
    await createDoacao(db, { doacaoValue })

    return res.redirect("/listDonation")
  } catch (error) {
    console.log(error)
  }
}

async function listDoacoesFeitas(req, res) {
  const { cod_doador } = req.query
  console.log(`Código do doador: ${cod_doador}`)

  try {
    const db = await Database

    const doacoes = await db.all(`
        SELECT
          doacao.descricao,
          doacao.quantidade,
          instituicao.nome AS "instituicao",
          categoria.descricao AS "categoria"
        FROM doacao
        INNER JOIN instituicao ON instituicao.cod_institu = doacao.cod_institu
        INNER JOIN categoria ON categoria.cod_categ = doacao.cod_categ
        WHERE doacao.cod_doador = '${cod_doador}'
      `)

    // console.log(doacoes)
    if (res) return res.status(200).json(doacoes)
    else return doacoes
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

async function listDoacoesRecebidas(req, res) {
  const { cod_institu } = req.query
  console.log(`Código da instituição: ${cod_institu}`)

  try {
    const db = await Database

    const doacoes = await db.all(`
      SELECT
        doacao.descricao,
        doacao.quantidade,
        doador.nome AS "doador",
        voluntario.nome AS "voluntario"
      FROM doacao
      INNER JOIN doador ON doador.cod_doador = doacao.cod_doador
      INNER JOIN voluntario ON voluntario.cod_volunt = doacao.cod_volunt
      WHERE doacao.cod_institu = '${cod_institu}' and doacao.status = 'Entregue'
    `)

    // console.log(doacoes)
    if (res) return res.status(200).json(doacoes)
    else return doacoes
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

async function listDoacoesEmAndamento(req, res) {
  const { cod_volunt } = req.query
  console.log(`Código da voluntário: ${cod_volunt}`)

  try {
    const db = await Database

    const doacoes = await db.all(`
      SELECT
        doacao.descricao,
        doacao.quantidade,
        doador.nome AS "doador",
        doacao.rua AS "rua_doacao",
        doacao.nro AS "nro_doacao",
        doacao.bairro AS "bairro_doacao",
        instituicao.nome AS "instituicao",
        instituicao.rua AS "rua_instituicao",
        instituicao.nro AS "nro_instituicao",
        instituicao.bairro AS "bairro_instituicao"
      FROM doacao
      INNER JOIN doador ON doador.cod_doador = doacao.cod_doador
      INNER JOIN instituicao ON instituicao.cod_institu = doacao.cod_institu
      WHERE doacao.cod_volunt = '${cod_volunt}' and doacao.status = 'Em andamento'
    `)

    // console.log(doacoes)
    if (res) return res.status(200).json(doacoes)
    else return doacoes
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

async function listDoacoesEntregues(req, res) {
  const { cod_volunt } = req.query
  console.log(`Código da voluntário: ${cod_volunt}`)

  try {
    const db = await Database

    const doacoes = await db.all(`
      SELECT
        doacao.descricao,
        doacao.quantidade,
        doador.nome AS "doador",
        doacao.rua AS "rua_doacao",
        doacao.nro AS "nro_doacao",
        doacao.bairro AS "bairro_doacao",
        instituicao.nome AS "instituicao",
        instituicao.rua AS "rua_instituicao",
        instituicao.nro AS "nro_instituicao",
        instituicao.bairro AS "bairro_instituicao"
      FROM doacao
      INNER JOIN doador ON doador.cod_doador = doacao.cod_doador
      INNER JOIN instituicao ON instituicao.cod_institu = doacao.cod_institu
      WHERE doacao.cod_volunt = '${cod_volunt}' and doacao.status = 'Entregue'
    `)

    // console.log(doacoes)
    if (res) return res.status(200).json(doacoes)
    else return doacoes
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

async function listDoacoesPendentes(req, res) {
  const { cod_volunt } = req.query
  console.log(`Código da voluntário: ${cod_volunt}`)

  try {
    const db = await Database

    const doacoes = await db.all(`
      SELECT
        doacao.descricao,
        doacao.quantidade,
        doador.nome AS "doador",
        doacao.rua AS "rua_doacao",
        doacao.nro AS "nro_doacao",
        doacao.bairro AS "bairro_doacao",
        instituicao.nome AS "instituicao",
        instituicao.rua AS "rua_instituicao",
        instituicao.nro AS "nro_instituicao",
        instituicao.bairro AS "bairro_instituicao"
      FROM doacao
      INNER JOIN doador ON doador.cod_doador = doacao.cod_doador
      INNER JOIN instituicao ON instituicao.cod_institu = doacao.cod_institu
      WHERE doacao.status = 'Pendente'
    `)

    // console.log(doacoes)
    if (res) return res.status(200).json(doacoes)
    else return doacoes
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

module.exports = {
  register,
  listDoacoesFeitas,
  listDoacoesRecebidas,
  listDoacoesEmAndamento,
  listDoacoesEntregues,
  listDoacoesPendentes,
}