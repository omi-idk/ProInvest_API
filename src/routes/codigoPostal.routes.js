import { Router } from 'express';
import { createNewCodigoPostal, deleteCodigoPostal, getCodigoPostal, updateCodigoPostal } from '../controllers/codigoPostalController';

const router = Router();

router.get('/codigoPostal', getCodigoPostal);
router.post('/codigoPostal', createNewCodigoPostal); // Corrección: Cambiado de '/codigoPosta' a '/codigoPostal'
router.put('/codigoPostal/:id', updateCodigoPostal);
router.delete('/codigoPostal/:id', deleteCodigoPostal);

export default router;
