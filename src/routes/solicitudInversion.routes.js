import { Router } from 'express';
import { createNewSolicitudInversion, deleteSolicitudInversion, getSolicitudesInversion, updateSolicitudInversion } from '../controllers/solicitudInversion';

const router = Router();

router.get('/solicitudInversion', getSolicitudesInversion);
router.post('/solicitudInversion', createNewSolicitudInversion);
router.put('/solicitudInversion/:id', updateSolicitudInversion);
router.delete('/solicitudInversion/:id', deleteSolicitudInversion);

export default router;
