const Database = require('./database/db')

function pageLanding(req, res){
    return res.render("index.html")
}

function pageRegister(req, res){
  return res.render("register.html")
}

function pageLogin(req, res){
  return res.render("login.html")
}

function pageDoDonation(req, res){
  return res.render("doDonation.html")
}

function pageListDoacoes(req, res){
  return res.render("listDoacoesFeitasDoador.html")
}

async function saveDoacao(req, res) {
    //adicionar dados a lista de doacoes
    const createDoacao = require('./database/createDoacao')

    const doacaoValue = {
      descricao: req.body.descricao,
      quantidade: req.body.quantidade,
      cod_categ: parseInt(req.body.cod_categ),
      cod_doador: parseInt(req.body.cod_doador),
      cod_institu: parseInt(req.body.cod_institu),
    };

    try {
        const db = await Database
        await createDoacao(db, {doacaoValue})

        return res.redirect("/listDonation")
    } catch (error){
        console.log(error)
    }
}

async function saveVoluntario(req, res) {
  // adicionar dados a lista de voluntarios
  const createVoluntario = require('./database/createVoluntario')

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
      await createVoluntario(db, {voluntarioValue, veiculoValue})

      return res.redirect("/listDonation")
  } catch (error){
      console.log(error)
  }
}

async function saveDoador(req, res) {
  // adicionar dados a lista de doadores
  const createDoador = require('./database/createDoador')

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

async function saveInstituicao(req, res) {
  // adicionar dados a lista de instituições
  const createInstituicao = require('./database/createInstituicao')

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

module.exports = {
    pageLanding,
    pageRegister,
    pageLogin,
    pageDoDonation,
    pageListDoacoes,
    saveDoacao,
    saveVoluntario,
    saveDoador,
    saveInstituicao,
}