const Database = require('sqlite-async')

function execute(db){

    //criar as tabelas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS doacao(
          cod_doacao INTEGER PRIMARY KEY AUTOINCREMENT,
          descricao TEXT,
          quantidade INTEGER,
          cod_categ INTEGER,
          cod_doador INTEGER,
          cod_institu INTEGER
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)