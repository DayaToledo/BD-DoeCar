const Database = require('../database/db')
const { createDoacao } = require('../database/index')

function adicionaZero(numero){
  return numero < 9 ? `0${numero}` : `${numero}`
}

async function register(req, res) {
    //adicionar dados a lista de doacoes
    const data = new Date()
    const data_criacao = adicionaZero(data.getDate()) + "/" + adicionaZero(data.getMonth()) + "/" + adicionaZero(data.getFullYear())

    let rua
    let numero
    let bairro

    // if (req.body.meu_endereco) {
    //   const doador = (await db.all(`
    //   SELECT doador.rua, doador.nro, doador.bairro
    //   FROM doador
    //   WHERE cod_doador = '${userAtual}'
    // `))[0]
    //   rua = doador.rua
    //   numero = doador.nro
    //   bairro = doador.bairro
    // } else {
    //   rua = req.body.rua
    //   numero = req.body.numero
    //   bairro = req.body.bairro
    // }

    rua = "exemplo"
    numero = "123"
    bairro = "exemplo"

    const doacaoValue = {
      descricao: req.body.descricao,
      quantidade: req.body.quantidade,
      cod_categ: parseInt(req.body.cod_categ),
      cod_doador: parseInt(req.body.cod_doador),
      cod_institu: parseInt(req.body.cod_institu),
      rua,
      numero,
      bairro,
      data_criacao,
      disponivel_ate: req.body.disponivel_ate
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
  register,
}