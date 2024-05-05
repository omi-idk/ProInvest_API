import {Router} from 'express';

import { createNewEstado, deleteEstado, getEstados, updateEstado } from '../controllers/estadoController'

const router = Router();


router.get('/estado',getEstados);
router.post('/estado',createNewEstado);
router.delete('/estado/:id',deleteEstado);
router.put('/estado/:id',updateEstado);

export default router;