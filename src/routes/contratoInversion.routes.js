import { Router } from 'express';

import { getContratosInversion, createNewContratoInversion, updateContratoInversion, deleteContratoInversion } from '../controllers/contratoInversionController';

const router = Router();


router.get('/contratosInversion', getContratosInversion);
router.post('/contratosInversion', createNewContratoInversion);
router.put('/contratosInversion/:id', updateContratoInversion);
router.delete('/contratosInversion/:id', deleteContratoInversion);


export default router;
