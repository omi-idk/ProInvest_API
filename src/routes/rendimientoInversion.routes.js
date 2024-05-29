import { Router } from 'express';
import { createNewRendimientoInversion, deleteRendimientoInversion, getRendimientosInversion, updateRendimientoInversion } from '../controllers/rendimientoInversionController';

const router = Router();

router.get('/rendimientoInversion', getRendimientosInversion);
router.post('/rendimientoInversion', createNewRendimientoInversion);
router.put('/rendimientoInversion/:id', updateRendimientoInversion);
router.delete('/rendimientoInversion/:id', deleteRendimientoInversion);

export default router;
