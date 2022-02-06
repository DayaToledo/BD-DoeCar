const Database = require('../database/db')

function formatResponse(user, typeUser, res) {
  user.type = typeUser
  console.log(user)
  return res.status(200).json(user)
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || email === null || email === undefined || !password || password === null || password === undefined)
    return res.status(400).json({ msg: 'EMAIL OR PASSWORD INVALID' });

  try {
    const db = await Database

    const doador = (await db.all(`
      SELECT
        doador.cod_doador,
        doador.nome,
        doador.rua,
        doador.nro,
        doador.bairro
      FROM doador
      WHERE doador.email = '${email}' and doador.senha = '${password}'
    `))[0]

    if (doador) return formatResponse(doador, "doador", res)

    const instituicao = (await db.all(`
      SELECT
        instituicao.cod_institu,
        instituicao.nome,
        instituicao.rua,
        instituicao.nro,
        instituicao.bairro,
        instituicao.email
      FROM instituicao
      WHERE instituicao.email = '${email}' and instituicao.senha = '${password}'
    `))[0]

    if (instituicao) return formatResponse(instituicao, "instituicao", res)


    const voluntario = (await db.all(`
      SELECT
        voluntario.cod_volunt,
        voluntario.nome,
        voluntario.rua,
        voluntario.nro,
        voluntario.bairro,
        voluntario.email
      FROM voluntario
      WHERE voluntario.email = '${email}' and voluntario.senha = '${password}'
    `))[0]

    if (voluntario) return formatResponse(voluntario, "voluntario", res)

    return res.status(404).json({ msg: 'NOT FOUND' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'LOGIN ERROR' });
  }
}

module.exports = {
  login,
}