import { Router } from 'express';
import { createNewCodigoPostal, deleteCodigoPostal, getCodigoPostal, updateCodigoPostal } from '../controllers/codigoPostalController';

const router = Router();

router.get('/codigoPostal', getCodigoPostal);
router.post('/codigoPostal', createNewCodigoPostal);
router.put('/codigoPostal/:id', updateCodigoPostal);
router.delete('/codigoPostal/:id', deleteCodigoPostal);

export default router;
