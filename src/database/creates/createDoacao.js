module.exports = async function(db, {doacaoValue}){
  // inserir dados na tabela doacao
  await db.run(`
      INSERT INTO doacao (
        descricao,
        quantidade,
        cod_categ,
        cod_doador,
        cod_institu,
        rua,
        nro,
        bairro,
        data_criacao,
        disponivel_de,
        disponivel_ate,
        endereco_padrao,
        status
      ) VALUES (
          "${doacaoValue.descricao}",
          "${doacaoValue.quantidade}",
          "${doacaoValue.cod_categ}",
          "${doacaoValue.cod_doador}",
          "${doacaoValue.cod_institu}",
          "${doacaoValue.rua}",
          "${doacaoValue.numero}",
          "${doacaoValue.bairro}",
          "${doacaoValue.data_criacao}",
          "${doacaoValue.disponivel_de}",
          "${doacaoValue.disponivel_ate}",
          "${doacaoValue.endereco_padrao}",
          "Pendente"
      );
  `)
}