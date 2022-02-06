module.exports = async function(db, {doadorValue}){
    // inserir dados na tabela doador
    const { lastID: cod_doador }  = await db.run(`
        INSERT INTO doador (
          nome,
          cpf,
          rua,
          nro,
          bairro,
          email,
          senha
        ) VALUES (
            "${doadorValue.nome}",
            "${doadorValue.cpf}",
            "${doadorValue.rua}",
            "${doadorValue.numero}",
            "${doadorValue.bairro}",
            "${doadorValue.email}",
            "${doadorValue.senha}"
        );
    `)

    return cod_doador;
  }