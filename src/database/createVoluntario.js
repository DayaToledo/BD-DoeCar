module.exports = async function(db, {voluntarioValue, veiculoValue}){
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

  // inserir dados na tabela veiculo
  await db.run(`
      INSERT INTO veiculo (
        placa,
        modelo,
        ano,
        marca,
        cod_volunt
      ) VALUES (
          "${veiculoValue.placa}",
          "${veiculoValue.modelo}",
          "${veiculoValue.ano}",
          "${veiculoValue.marca}",
          "${voluntario_id}"
      );
  `)
}