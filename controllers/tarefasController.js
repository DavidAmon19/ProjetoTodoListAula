const path = require("path");
const fs = require("fs");
const tarefas = require("../data/tarefas.json");

const getTarefas = (req, res) => {
  res.send(tarefas);
};

const getTarefasById = (req, res) => {
  const id = req.params.id;
  const tarefa = tarefas.find((item) => item.id == id);

  if (!tarefa) {
    res.status(404).send("Tarefa não encontrada");
  }

  res.send(tarefa);
};

const createTarefa = (req, res) =>{
    const {nomeResponsavel, dataCriacao, dataFinalizacao, descricao, status} = req.body

    const novaTarefa = {
        id: tarefas.length ? tarefas.length + 1 : 1,
        nomeResponsavel,
        dataCriacao: dataCriacao || new Date(),
        dataFinalizacao: dataFinalizacao || null,
        descricao,
        status: status || 'pendente'
    }


    tarefas.push(novaTarefa);
    escreverDados(tarefas);

    res.status(201).send(novaTarefa);
}

const updateTarefa = (req, res) =>{
    const id = req.params.id;
    const index = tarefas.findIndex((item) => item.id == id);

    if(index !== -1){
        const tarefaAtualizada = req.body
        tarefas[index] = tarefaAtualizada
        escreverDados(tarefas);
        res.status(200).send(tarefaAtualizada);
    } else {
        res.status(404).send('Tarefa não encontrado')
    }

}



const deleteTarefa = (req, res) =>{
    const id = req.params.id;
    const novoArray = tarefas.filter((item) => item.id != id);

    escreverDados(novoArray);
    res.status(204)
};




const escreverDados = (tarefas) =>{
    fs.writeFileSync(path.join(__dirname,'../data/tarefas.json'), JSON.stringify(tarefas), 'utf-8');
};


module.exports = {
    getTarefas,
    getTarefasById,
    createTarefa,
    updateTarefa,
    deleteTarefa
}