const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const tarefasRouter = require('./routes/tarefasRoutes')
const app = express();
const port = process.env.PORT_SERVER;

dotenv.config()

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('API FUNCIONANDO');
});

app.use('/tarefas', tarefasRouter);


app.listen(port, ()=>{
    try {
        console.log(`Servidor rodando no link http://localhost:${port}`)
    } catch (error) {
        console.log('Erro ao iniciar servidor', error);
    }
})