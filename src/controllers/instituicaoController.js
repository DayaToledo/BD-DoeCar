const Database = require('../database/db')
const { createInstituicao } = require('../database/index')

async function register(req, res) {
  // adicionar dados a lista de instituições
  console.log(req.body);

  const email = req.body.email_instituicao_pc !== "" ? req.body.email_instituicao_pc : req.body.email_instituicao
  const senha = req.body.senha_instituicao_pc !== "" ? req.body.senha_instituicao_pc : req.body.senha_instituicao
  const confirmaSenha = req.body.senha_confirma_instituicao_pc !== "" ? req.body.senha_confirma_instituicao_pc : req.body.senha_confirma_instituicao

  if (senha !== confirmaSenha) {
    console.log("Senhas diferentes!")
    return res.redirect("/register")
  }

  const instituicaoValue = {
    nome: req.body.nome_instituicao,
    cnpj: req.body.cnpj_instituicao,
    ramo: req.body.ramo_instituicao,
    rua: req.body.rua_instituicao,
    numero: req.body.numero_instituicao,
    bairro: req.body.bairro_instituicao,
    email,
    senha,
  };


  try {
      const db = await Database
      await createInstituicao(db, {instituicaoValue})

      return res.redirect("/listDonation")
  } catch (error){
      console.log(error)
  }
}

async function listAll(req, res) {
  try {
    const db = await Database

    const instituicoes = await db.all(`
      SELECT
        cod_institu,
        instituicao.nome
      FROM instituicao
    `)

    console.log(instituicoes)
    if (res) return res.status(200).json(instituicoes)
    else return instituicoes
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'SELECT ERROR' })
  }
}

module.exports = {
  register,
  listAll,
}