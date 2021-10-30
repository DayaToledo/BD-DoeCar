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
    //adicionar dados a lista de proffys
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

module.exports = {
    pageLanding,
    pageRegister,
    pageLogin,
    pageDoDonation,
    pageListDoacoes,
    saveDoacao
}