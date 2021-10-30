module.exports = async function(db, {doacaoValue}){
  // inserir dados na tabela doacao
  await db.run(`
      INSERT INTO doacao (
        descricao,
        quantidade,
        cod_categ,
        cod_doador,
        cod_institu
      ) VALUES (
          "${doacaoValue.descricao}",
          "${doacaoValue.quantidade}",
          "${doacaoValue.cod_categ}",
          "${doacaoValue.cod_doador}",
          "${doacaoValue.cod_institu}"
      );
  `)
}