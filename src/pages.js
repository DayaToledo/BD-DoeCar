const Instituicao = require('./controllers/instituicaoController')
const Categoria = require('./controllers/categoriaController')
const {
  listDoacoesFeitas,
  listDoacoesRecebidas,
  listDoacoesEmAndamento,
  listDoacoesEntregues,
  listDoacoesPendentes
} = require('./controllers/doacaoController')

function pageProfileDoador(req, res) {
  return res.render("profileDoador.html")
}

function pageProfileVoluntario(req, res) {
  return res.render("profileVoluntario.html")
}

function pageLanding(req, res) {
  return res.render("index.html")
}

function pageRegister(req, res) {
  return res.render("register.html")
}

function pageLogin(req, res) {
  return res.render("login.html")
}

async function pageDoDonation(req, res) {
  const instituicoes = await Instituicao.listAll();
  const categorias = await Categoria.listAll();
  return res.render("doDonation.html", { instituicoes, categorias })
}

async function pageListDoacoes(req, res) {
  const doacoes = req.query.cod_doador ? await listDoacoesFeitas(req) : [];
  return res.render("listDoacoesFeitasDoador.html", { doacoes })
}

async function pageListDoacoesRecebidas(req, res) {
  const doacoes = req.query.cod_institu ? await listDoacoesRecebidas(req) : [];
  return res.render("listDoacoesRecebidasInstitu.html", { doacoes })
}

async function pageListDoacoesEntregues(req, res) {
  const doacoes = req.query.cod_volunt ? await listDoacoesEntregues(req) : [];
  return res.render("listDoacoesEntreguesVoluntario.html", { doacoes, cod_volunt: req.query.cod_volunt })
}

async function pageListDoacoesAndamento(req, res) {
  const doacoes = req.query.cod_volunt ? await listDoacoesEmAndamento(req) : [];
  return res.render("listDoacoesAndamentoVoluntario.html", { doacoes, cod_volunt: req.query.cod_volunt })
}

async function pageListEscolhasDoacoes(req, res) {
  const doacoes = req.query.cod_volunt ? await listDoacoesPendentes(req) : [];
  return res.render("listEscolhasDoacoesVoluntario.html", { doacoes, cod_volunt: req.query.cod_volunt })
}

module.exports = {
  pageProfileDoador,
  pageProfileVoluntario,
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