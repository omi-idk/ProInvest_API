import {Router} from 'express';

import {createNewCliente, deleteCliente, getClientes, updateCliente} from '../controllers/clienteController'



const router = Router();

router.get('/cliente', getClientes);
router.post('/cliente', createNewCliente);
router.delete('/cliente/:id', deleteCliente)
router.put('/cliente/:id', updateCliente)
router.get('/cliente', getClientes)
router.get('/cliente', getClientes)



export default router;