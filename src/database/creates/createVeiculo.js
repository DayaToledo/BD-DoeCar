module.exports = async function(db, {voluntario_id, veiculoValue}){
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