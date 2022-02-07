const Doacao = require('./controllers/doacaoController')
// const Doador = require('./controllers/doadorController')
// const Instituicao = require('./controllers/instituicaoController')
// const Voluntario = require('./controllers/voluntarioController')
// const Login = require('./controllers/loginController')

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

async function pageListDoacoes(req, res){
  const doacoes = req.query.cod_doador ? await Doacao.listDoacoesFeitas(req) : [];
  return res.render("listDoacoesFeitasDoador.html", {doacoes})
}

function pageListDoacoesRecebidas(req, res){
  return res.render("listDoacoesRecebidasInstitu.html")
}

function pageListDoacoesEntregues(req, res){
  return res.render("listDoacoesEntreguesVoluntario.html")
}

function pageListDoacoesAndamento(req, res){
  return res.render("listDoacoesAndamentoVoluntario.html")
}

function pageListEscolhasDoacoes(req, res){
  return res.render("listEscolhasDoacoesVoluntario.html")
}

module.exports = {
    pageLanding,
    pageRegister,
    pageLogin,
    pageDoDonation,
    pageListDoacoes,
    pageListDoacoesRecebidas,
    pageListDoacoesEntregues,
    pageListDoacoesAndamento,
    pageListEscolhasDoacoes,
}