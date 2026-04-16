//Importações
const express = require( `express` ) // Framework que cria o servidor e as rotas
const { criarBanco } = require(`./database`) //A chave que vai abrir a conecção com o banco de dados


const  cors = require('cors'); // Importa o middleware CORS

const app = express() // inicialização: ligando o otor do servidor

app.use(cors()) // Habilita o CORS para todas as rotas

app.use( express.json()) // Tradutor: configura o Express para entender dados enviados no formato JSON
// Criando a Rota Principal /Rota Raiz


app.get( `/`, (req,res) => {
    //res.send: envia uma resposta simples ( texto,html,json)
  res.send(`
    <body>
<h1> ZelaCidade </h1>
<h2> Gestão de Problemas Urbanos </h2>
<p> Endpoint que leva aos iniciantes cadastrados: /incidentes </p>
    </body>

    `);

});

//Rota de Listagem - Para buscar todos os problemas  registrados 
app.get("/incidentes", async (req,res) => {
const db = await criarBanco() // Chamamos a função do outro arquivo. Await é o "aguarde", pois o banco precisa de tempo pra abrir.

const listaIncidentes = await db.all(`SELECT * FROM incidentes`)

res.json(listaIncidentes) //Entrega esses dados para o cliente 

});

//Rota para buscar incidente específico por ID
app.get("/incidentes/:id", async (req,res) => {
const { id } = req.params
const db = await criarBanco()
const incidenteEspecifico = await db.all(`SELECT * FROM incidentes WHERE id = ?` , [id])
res.json(incidenteEspecifico)
});

//Rota para criar novo incidente
app.post("/incidentes", async (req,res) => {
  const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro}= req.body
  const db = await criarBanco()
  await db.run(`
    INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, 
    nome_solicitante, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
    [
       tipo_problema, 
       localizacao, 
       descricao,
       prioridade,
       nome_solicitante, 
       data_registro,
       hora_registro
        ],
      );   
      
      // Envia uma resposta simples para o cliente confirmando que o incidente foi registrado
  res.send(`Incidente novo registrado: ${tipo_problema} registrado na data ${data_registro}
     por ${nome_solicitante}`)
});


// rota de Atualizazação
app.put("/incidentes/:id", async (req,res) => {
  // Paga o ID do incidente que vem a URL (ex: /incidentes/4)
  try {
    // Pega o ID do incidente que vem a URL (ex: /incidentes/4)
    const { id } = req.params;

    // pega os novos dados enviados no corpo da requisição (o que será atualizado)
    const { descricao, prioridade, status_resolucao } = req.body;

    // Abre a conexão com o banco de dados
    const db = await criarBanco();

    const result = await db.run(`
      UPDATE incidentes
      SET descricao = ?, prioridade = ?, status_resolucao = ?
      WHERE id = ?`, [descricao, prioridade, status_resolucao, id]
    );

    if (!result || result.changes === 0) {
      return res.status(404).json({ erro: `Incidente com id ${id} não encontrado` });
    }

    res.json({ message: `Incidente ${id} atualizado com sucesso` });
  } catch (err) {
    console.error("Erro em PUT /incidentes/:id", err);
    res.status(500).json({ erro: err.message });
  }
});

// Rota de remoção
app.delete("/incidentes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await criarBanco();

    const result = await db.run(`
      DELETE FROM incidentes WHERE id = ?
    `, [id]);

    if (!result || result.changes === 0) {
      return res.status(404).json({ erro: `Incidente com id ${id} não encontrado` });
    }

    res.send(`O incidente de ${id} foi removido com sucesso`);
  } catch (err) {
    console.error("Erro em DELETE /incidentes/:id", err);
    res.status(500).json({ erro: err.message });
  }
});



// Rota de listagem - Para buscar todos os problemas  registrados
app.get("/incidentes", async (req,res) => {
const db = await criarBanco(); // Chamamos a função do outro arquivo. Await é o "aguarde", pois o banco precisa de tempo pra abrir.
const listaIncidentes = await db.all(`SELECT * FROM incidentes`);
res.json(listaIncidentes); //Entrega esses dados para o cliente em formato JSON

// Rota Especifica 
app.get("/incidentes/:id", async (req,res) => {
  const { id } = req.params;
  const db = await criarBanco();
  const incidenteEspecifico = await db.all(
    `SELECT * FROM incidentes WHERE id = ?`, 
    [id]);
  res.json(incidenteEspecifico);
}

);


//Porta do servidor

// criando uma variavel inteligente para a porta
const PORT = process.env.PORT || 3000; // Usa a porta do ambiente ou 3000 como padrão 

// ligando o servidor 
app.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);
});