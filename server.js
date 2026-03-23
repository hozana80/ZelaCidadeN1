//Importaçõess
const express = require( `express` ) // Framework que cria o servidor e as rotas
const { criarBanco } = require(`./database`) //A chave que vai abrir a conecção com o banco de dados


const app = express() // inicialização: ligando o otor do servidor

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

//Porta do servidor

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);


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
  await db.run(`INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)`, [ tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro])         
  res.send(`Incidente novo registrado: ${tipo_problema} registrado na data ${data_registro} por ${nome_solicitante}`)
});