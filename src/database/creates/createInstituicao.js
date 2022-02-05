module.exports = async function(db, {instituicaoValue}){
    // inserir dados na tabela instituicao
    await db.run(`
        INSERT INTO instituicao (
          nome,
          cnpj,
          ramo,
          rua,
          nro,
          bairro,
          email,
          senha
        ) VALUES (
            "${instituicaoValue.nome}",
            "${instituicaoValue.cnpj}",
            "${instituicaoValue.ramo}",
            "${instituicaoValue.rua}",
            "${instituicaoValue.numero}",
            "${instituicaoValue.bairro}",
            "${instituicaoValue.email}",
            "${instituicaoValue.senha}"
        );
    `)
  }