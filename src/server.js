const { pageLanding, pageRegister, pageLogin, pageDoDonation, pageListDoacoes, saveDoacao } = require('./pages')

const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.get("/", pageLanding)
.get("/register", pageRegister)
.get("/login", pageLogin)
.get("/do-donation", pageDoDonation)
.get("/listDonation", pageListDoacoes)
.post("/saveDoacao", saveDoacao)
.listen(5500)