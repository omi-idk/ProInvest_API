import { Router } from 'express';
import { createNewInformacionBancaria, deleteInformacionBancaria, getInformacionesBancarias, updateInformacionBancaria } from '../controllers/informacionBancariaController';

const router = Router();

router.get('/informacionBancaria', getInformacionesBancarias);
router.post('/informacionBancaria', createNewInformacionBancaria);
router.put('/informacionBancaria/:id', updateInformacionBancaria);
router.delete('/informacionBancaria/:id', deleteInformacionBancaria);

export default router;
