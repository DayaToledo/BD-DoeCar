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

        CREATE TABLE IF NOT EXISTS voluntario(
          cod_volunt INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          cpf TEXT,
          rua TEXT,
          nro TEXT,
          bairro TEXT,
          email TEXT,
          senha TEXT
        );

        CREATE TABLE IF NOT EXISTS veiculo(
          cod_veiculo INTEGER PRIMARY KEY AUTOINCREMENT,
          placa TEXT,
          modelo TEXT,
          ano TEXT,
          marca TEXT,
          cod_volunt INTEGER,
          FOREIGN KEY (cod_volunt) REFERENCES voluntario(cod_volunt)
        );

        CREATE TABLE IF NOT EXISTS doador(
          cod_doador INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          cpf TEXT,
          rua TEXT,
          nro TEXT,
          bairro TEXT,
          email TEXT,
          senha TEXT
        );

        CREATE TABLE IF NOT EXISTS instituicao(
          cod_instituicao INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          cnpj TEXT,
          ramo TEXT,
          rua TEXT,
          nro TEXT,
          bairro TEXT,
          email TEXT,
          senha TEXT
        );

    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)