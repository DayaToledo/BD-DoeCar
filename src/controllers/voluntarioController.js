const Database = require('../database/db')
const { createVoluntario, createVeiculo } = require('../database/index')

async function register(req, res) {
  // adicionar dados a lista de voluntarios
  console.log(req.body);

  const email = req.body.email_voluntario_pc !== "" ? req.body.email_voluntario_pc : req.body.email_voluntario
  const senha = req.body.senha_voluntario_pc !== "" ? req.body.senha_voluntario_pc : req.body.senha_voluntario
  const confirmaSenha = req.body.senha_confirma_voluntario_pc !== "" ? req.body.senha_confirma_voluntario_pc : req.body.senha_confirma_voluntario

  if (senha !== confirmaSenha) {
    console.log("Senhas diferentes!")
    return res.redirect("/register")
  }

  const voluntarioValue = {
    nome: req.body.nome_voluntario,
    cpf: req.body.cpf_voluntario,
    rua: req.body.rua_voluntario,
    numero: req.body.numero_voluntario,
    bairro: req.body.bairro_voluntario,
    email,
    senha,
  };

  const veiculoValue = {
    placa: req.body.placa_voluntario,
    marca: req.body.marca_voluntario,
    modelo: req.body.modelo_voluntario,
    ano: req.body.ano_voluntario,
  };

  try {
      const db = await Database
      const voluntario_id = await createVoluntario(db, {voluntarioValue})
      await createVeiculo(db, {voluntario_id, veiculoValue})

      return res.redirect("/listDonation")
  } catch (error){
      console.log(error)
  }
}

module.exports = {
  register,
}