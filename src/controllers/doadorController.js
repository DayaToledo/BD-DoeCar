const Database = require('../database/db')
const { createDoador } = require('../database/index')

async function register(req, res) {
  // adicionar dados a lista de doadores
  console.log(req.body);

  const email = req.body.email_doador_pc !== "" ? req.body.email_doador_pc : req.body.email_doador
  const senha = req.body.senha_doador_pc !== "" ? req.body.senha_doador_pc : req.body.senha_doador
  const confirmaSenha = req.body.senha_confirma_doador_pc !== "" ? req.body.senha_confirma_doador_pc : req.body.senha_confirma_doador

  if (senha !== confirmaSenha) {
    console.log("Senhas diferentes!")
    return res.redirect("/register")
  }

  const doadorValue = {
    nome: req.body.nome_doador,
    cpf: req.body.cpf_doador,
    rua: req.body.rua_doador,
    numero: req.body.numero_doador,
    bairro: req.body.bairro_doador,
    email,
    senha,
  };


  try {
      const db = await Database
      await createDoador(db, {doadorValue})

      return res.redirect("/listDonation")
  } catch (error){
      console.log(error)
  }
}

module.exports = {
  register,
}