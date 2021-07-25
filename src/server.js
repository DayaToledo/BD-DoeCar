const { pageLanding, pageRegister, pageLogin, pageDoDonation, pageListDoacoes } = require('./pages')

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
.post("/listDonation", pageListDoacoes)
.listen(5500)