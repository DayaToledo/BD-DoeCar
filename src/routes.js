const { Router } = require('express');
const router = Router();

const {
  pageLanding,
  pageRegister,
  pageLogin,
  pageDoDonation,
  pageListDoacoes,
} = require('./pages')

const Doacao = require('./controllers/doacaoController')
const Doador = require('./controllers/doadorController')
const Instituicao = require('./controllers/instituicaoController')
const Voluntario = require('./controllers/voluntarioController')

router.get("/", pageLanding)
router.get("/register", pageRegister)
router.get("/login", pageLogin)
router.get("/do-donation", pageDoDonation)
router.get("/listDonation", pageListDoacoes)

router.post("/saveDoacao", Doacao.register)
router.post("/saveDoador", Doador.register)
router.post("/saveInstituicao", Instituicao.register)
router.post("/saveVoluntario", Voluntario.register)

module.exports = { router };