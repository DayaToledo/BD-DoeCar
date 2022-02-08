const Database = require('./db')

const main = async () => {
  try {
    const db = await Database
    const categoria = Object.values(await db.get('SELECT EXISTS (SELECT 1 FROM categoria)'))[0];
    const voluntario = Object.values(await db.all('SELECT count(*) FROM voluntario'))[0];
    const veiculo = Object.values(await db.all('SELECT count(*) FROM veiculo'))[0];
    const doador = Object.values(await db.all('SELECT count(*) FROM doador'))[0];
    const instituicao = Object.values(await db.all('SELECT count(*) FROM instituicao'))[0];
    const doacao = Object.values(await db.all('SELECT count(*) FROM doacao'))[0];

    if (categoria && voluntario && veiculo && doador && instituicao && doacao)
      return Promise.resolve("Pelo menos uma das tabelas já está populada!");

    await db.run(`
      INSERT INTO categoria (descricao)
      VALUES
        ("Alimento"),
        ("Roupa"),
        ("Calçados"),
        ("Movéis"),
        ("Limpeza");

      INSERT INTO doador (nome, cpf, rua, nro, bairro, email, senha)
      VALUES
        ("José",    "159.753.696-78", "Rua Santa Luzia", 2365, "Jardim João",     "jose@gmail.com",     "598887453"),
        ("Matheus", "459.598.258-78", "Rua Pernambuco", 986, "Bairro Piauí",      "matheus@gmail.com",  "36557453"),
        ("Antônia", "222.569.321-78", "Rua dezembro", 155, "Vila Maria Madalena", "antonia@gmail.com",  "78887453"),
        ("Solange", "159.159.369-78", "Rua João Luz", 123, "Jardim Alegria",      "solange@gmail.com",  "12237453"),
        ("Thales",  "756.111.598-45", "Rua terça-feira", 850, "Bairro França",    "thales@gmail.com",   "56637453");

      INSERT INTO voluntario (nome, cpf, rua, nro, bairro, email, senha)
      VALUES
        ("Dayana",  "159.753.258-78", "Rua Antônio João", 1065, "Jardim Hikari",  "dayana@gmail.com", "15987453"),
        ("Bruna",   "459.632.258-78", "Rua São Paulo", 756, "Bairro Santa Maria", "bruna@gmail.com",  "45987453"),
        ("Gabriel", "159.569.321-78", "Rua Alagoas", 145, "Vila Oriente",         "gabi@gmail.com",   "65987453"),
        ("Maria",   "159.159.369-78", "Rua Vargas", 235, "Jardim Esmeralda",      "maria@gmail.com",  "59887453"),
        ("Loren",   "756.753.598-45", "Rua 10 setembro", 712, "Bairro Alemanha",  "loren@gmail.com",  "36987453");

      INSERT INTO veiculo (placa, modelo, ano, marca, cod_volunt)
      VALUES
        ("ARDF-458", "Onix",  2019, "Chevrolet",  1),
        ("BHJG-159", "Corsa", 2008, "Chevrolet",  2),
        ("THYF-456", "Gol",   2012, "volkswagen", 3),
        ("HFDD-358", "Onix",  2019, "Chevrolet",  4),
        ("DFRG-785", "Fox",   2010, "volkswagen", 5);

      INSERT INTO instituicao (nome, cnpj, ramo, rua, nro, bairro, email, senha)
      VALUES
        ("Apae Brasil",               "06.665.244/0001-70", "Deficientes", "Alameda Yosakichi Yoshida", 185, "Jardim Esplanada",  "apae@gmail.com",           "159875633"),
        ("Lar São Vicente de Paulo",  "86.115.244/7891-70", "Asilo", "Rua Dr. Sales de Oliveira", 119, "Vila Industrial",         "larsaovicente@gmail.com",  "222875111"),
        ("Orfanato Raio de luz",      "11.789.256/0001-78", "Orfanato", "Avenida Angélica", 321, "Bairro Santa Cecilia",          "raioluz@gmail.com",        "545575633"),
        ("Lar São Rafael",            "01.789.255/0001-70", "Asilo", "Rua Joaquim Nabuco", 1670, "Vila Paraiso",                  "saorafael@gmail.com",      "889871444"),
        ("Lar Santa Filomena",        "41.333.111/0001-70", "Orfanato", "Rua Luís Carlos Ferrari", 125, "Jardim Itapura",         "filomena@gmail.com",       "178952323");

      INSERT INTO doacao (descricao, quantidade, cod_categ, cod_doador, cod_institu, cod_volunt, rua, nro, bairro, data_criacao, disponivel_ate, status)
      VALUES
        ("Doação de blusas",  6, 2, 3, 1, 1,    "Rua dezembro", 155, "Vila Maria Madalena", "13/05/2021", "29/05/2022", "Entregue"),
        ("Doação de arroz",   2, 1, 3, 1, 1,    "Rua dezembro", 155, "Vila Maria Madalena", "13/05/2021", "13/05/2022", "Entregue"),
        ("Doação de feijão",  5, 1, 2, 3, null, "Rua Pernambuco", 986, "Bairro Piauí",      "13/05/2021", "13/07/2021", "Pendente"),
        ("Doação de sapato",  2, 3, 1, 2, null, "Rua Santa Luzia", 2365, "Jardim João",     "13/05/2021", "13/08/2022", "Pendente"),
        ("Doação de sabão",   6, 5, 1, 4, 1,    "Rua Santa Luzia", 2365, "Jardim João",     "13/05/2021", "09/02/2022", "Em andamento");
    `)

    return Promise.resolve("As tabelas estavam vazias e todas foram populadas!");
  } catch (error) {
    return Promise.reject(error);
  }
}

main()
  .then((response) => console.log(response))
  .catch((error) => console.log(error));