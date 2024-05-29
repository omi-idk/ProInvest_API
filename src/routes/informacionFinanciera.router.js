import { Router } from 'express';
import { createNewInformacionFinanciera, deleteInformacionFinanciera, getInformacionFinanciera, updateInformacionFinanciera } from '../controllers/informacionFinancieraController';

const router = Router();

router.get('/informacionFinanciera', getInformacionFinanciera);
router.post('/informacionFinanciera', createNewInformacionFinanciera);
router.put('/informacionFinanciera/:id', updateInformacionFinanciera);
router.delete('/informacionFinanciera/:id', deleteInformacionFinanciera);

export default router;
