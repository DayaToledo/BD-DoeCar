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

module.exports = {
    pageLanding,
    pageRegister,
    pageLogin,
    pageDoDonation,
    pageListDoacoes,
}