import { Router } from 'express';
import { createNewTipoInversion, deleteTipoInversion, getTiposInversion, updateTipoInversion } from '../controllers/tipoInversionController';

const router = Router();

router.get('/tipoInversion', getTiposInversion);
router.post('/tipoInversion', createNewTipoInversion);
router.put('/tipoInversion/:id', updateTipoInversion);
router.delete('/tipoInversion/:id', deleteTipoInversion);

export default router;
