const Database = require('../database/db')
const { createDoador } = require('../database/index')

async function register(req, res) {
  // adicionar dados a lista de doadores
  // console.log(req.body);

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
      const cod_doador = await createDoador(db, {doadorValue})

      doadorValue.cod_doador = cod_doador
      delete doadorValue.senha
      delete doadorValue.cpf
      delete doadorValue.email
      return res.status(200).json(doadorValue)
  } catch (error){
      console.log(error)
  }
}

async function update(req, res) {
  console.log(req.body)

  try {
    const db = await Database

    await db.run(`
      UPDATE doador
      SET
        rua = '${req.body.rua}',
        nro = '${req.body.numero}',
        bairro = '${req.body.bairro}'
      WHERE cod_doador = ${req.body.cod_doador};
    `)

    if (res) return res.status(200).json({ msg: 'Atualizado com sucesso!' })
    else return { msg: 'Atualizado com sucesso!' }
  } catch (error) {
    console.log(error)
    if (res) return res.status(500).json({ msg: 'UPDATE ERROR' })
    else throw error
  }
}

module.exports = {
  register,
  update,
}