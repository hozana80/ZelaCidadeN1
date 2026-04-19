const { Pool } = require('pg');

// Criando uma função assíncrona
const criarBanco = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/zelarcidade',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    const client = await pool.connect();
    // Criando a tabela de incidentes
    await client.query(`
      CREATE TABLE IF NOT EXISTS incidentes(
          id SERIAL PRIMARY KEY,
          tipo_problema TEXT,
          localizacao TEXT,
          descricao TEXT,
          prioridade TEXT,
          nome_solicitante TEXT,
          data_registro TEXT,
          hora_registro TEXT,
          status_resolucao TEXT DEFAULT 'Pendente'
      )
      `);

    console.log(
      "Banco de dados configurado: A tabela de registros urbanos está pronta!",
    );

    const checagem = await client.query(`SELECT COUNT (*) AS total FROM incidentes`);
    const total = parseInt(checagem.rows[0].total);

    if (total === 0) {
      const insertQuery = `
        INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES
        ($1, $2, $3, $4, $5, $6, $7),
        ($8, $9, $10, $11, $12, $13, $14),
        ($15, $16, $17, $18, $19, $20, $21),
        ($22, $23, $24, $25, $26, $27, $28),
        ($29, $30, $31, $32, $33, $34, $35)
      `;
      const values = [
        "Iluminação", "Rua das Flores, 123, Bairro das Margaridas", "Poste queimado há dias", "Média", "Ana Clara", "16/03/2026", "10:30",
        "Falta de energia", "Hospital JP2", "Local na escuridão", "Alta", "Antonio Perna Quebrada", "16/03/2026", "22:15",
        "Vazamento de água", "Rua das Camélias, 52", "Vazamento de água constante próximo ao bueiro.", "Alta", "Julia Martins", "2026-03-16", "10:00",
        "Pavimentação", "Avenida C, Bairro D","Calçada em mau estado", "Alta", "Maria Oliveira","14/03/2026", "14:30",
        "Falta de água", "Rua T, 146, Jardim Imbarie", "Moradores sem água", "Alta", "Dona Fofoca", "16/03/2026", "10:00"
      ];
      await client.query(insertQuery, values);
    } else {
      console.log(`Banco pronto com ${total} de incidentes `);
    }

    const todosOsIncidentes = await client.query("SELECT * FROM incidentes");
    console.table(todosOsIncidentes.rows);

    const chamadosAna = await client.query(`SELECT * FROM incidentes WHERE nome_solicitante = $1`, ["Ana Clara"]);
    console.table(chamadosAna.rows);

    client.release();
    return pool;
  } catch (err) {
    console.error('Erro ao configurar o banco de dados:', err);
    throw err;
  }
};

module.exports = { criarBanco };

module.exports = { criarBanco };
