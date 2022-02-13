const { Router } = require('express');
const router = Router();

const {
  pageLanding,
  pageRegister,
  pageLogin,
  pageDoDonation,
  pageListDoacoes,
  pageListDoacoesRecebidas,
  pageListDoacoesEntregues,
  pageListDoacoesAndamento,
  pageListEscolhasDoacoes,
} = require('./pages')

const Doacao = require('./controllers/doacaoController')
const Doador = require('./controllers/doadorController')
const Instituicao = require('./controllers/instituicaoController')
const Voluntario = require('./controllers/voluntarioController')
const Login = require('./controllers/loginController')

router.get("/", pageLanding)
router.get("/register", pageRegister)
router.get("/login", pageLogin)
router.get("/do-donation", pageDoDonation)
router.get("/listDonation", pageListDoacoes)
router.get("/listDonationRecebidas", pageListDoacoesRecebidas)
router.get("/listDonationEntregues", pageListDoacoesEntregues)
router.get("/listDonationAndamento", pageListDoacoesAndamento)
router.get("/listEscolhaDoacoes", pageListEscolhasDoacoes)

router.post("/saveDoacao", Doacao.register)
router.post("/saveDoador", Doador.register)
router.post("/saveInstituicao", Instituicao.register)
router.post("/saveVoluntario", Voluntario.register)

router.post("/verifyLogin", Login.login)

router.put("/chooseDoacao", Doacao.addVoluntarioInDoacao)
router.put("/finalizeDoacao", Doacao.finalizeDoacao)

module.exports = { router };