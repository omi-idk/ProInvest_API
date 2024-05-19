import {Router} from 'express';

import { createNewEmpresaTrabajo, deleteEmpresaTrabajo, getEmpresaTrabajo, updateEmpresaTrabajo } from '../controllers/empresaTrabajoController'

const router = Router();


router.get('/empresaTrabajo',getEmpresaTrabajo);
router.post('/empresaTrabajo',createNewEmpresaTrabajo);
router.put('/empresaTrabajo/:id',updateEmpresaTrabajo);
router.delete('/empresaTrabajo/:id',deleteEmpresaTrabajo);


export default router;