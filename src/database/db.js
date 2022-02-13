const Database = require('sqlite-async')

async function execute(db) {
  //criar as tabelas do banco de dados
  return db.exec(`
        CREATE TABLE IF NOT EXISTS categoria(
          cod_categ INTEGER PRIMARY KEY AUTOINCREMENT,
          descricao TEXT
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
          cod_institu INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          cnpj TEXT,
          ramo TEXT,
          rua TEXT,
          nro TEXT,
          bairro TEXT,
          email TEXT,
          senha TEXT
        );

        CREATE TABLE IF NOT EXISTS doacao(
          cod_doacao INTEGER PRIMARY KEY AUTOINCREMENT,
          descricao TEXT,
          quantidade INTEGER,
          cod_categ INTEGER,
          cod_doador INTEGER,
          cod_institu INTEGER,
          cod_volunt INTEGER,
          rua TEXT,
          nro TEXT,
          bairro TEXT,
          data_criacao TEXT,
          disponivel_de TEXT,
          disponivel_ate TEXT,
          endereco_padrao INTEGER,
          status TEXT,
          FOREIGN KEY (cod_categ) REFERENCES categoria(cod_categ),
          FOREIGN KEY (cod_doador) REFERENCES doador(cod_doador),
          FOREIGN KEY (cod_institu) REFERENCES instituicao(cod_institu),
          FOREIGN KEY (cod_volunt) REFERENCES voluntario(cod_volunt)
        );

        CREATE TRIGGER IF NOT EXISTS update_doador_address AFTER UPDATE ON doador
          BEGIN
            UPDATE doacao SET
              rua = new.rua,
              nro = new.nro,
              bairro = new.bairro
            WHERE cod_doador = new.cod_doador
              AND endereco_padrao = 1;
          END;
  `)
}

/*
POSSÍVEIS STATUS DE UMA DOAÇÃO:
- Entregue
- Pendente
- Em andamento
- Expirada
*/

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)