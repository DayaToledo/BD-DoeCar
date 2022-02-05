module.exports = async function(db, {voluntarioValue}){
  // inserir dados na tabela voluntario
  const { lastID: voluntario_id } = await db.run(`
      INSERT INTO voluntario (
        nome,
        cpf,
        rua,
        nro,
        bairro,
        email,
        senha
      ) VALUES (
          "${voluntarioValue.nome}",
          "${voluntarioValue.cpf}",
          "${voluntarioValue.rua}",
          "${voluntarioValue.numero}",
          "${voluntarioValue.bairro}",
          "${voluntarioValue.email}",
          "${voluntarioValue.senha}"
      );
  `)

  return voluntario_id;
}