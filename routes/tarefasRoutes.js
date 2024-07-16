const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');



router.get('/', tarefasController.getTarefas);
router.get('/:id', tarefasController.getTarefasById);
router.post('/', tarefasController.createTarefa);
router.put('/:id', tarefasController.updateTarefa);
router.delete('/:id', tarefasController.deleteTarefa);




module.exports = router;