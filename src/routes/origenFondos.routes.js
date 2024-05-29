import { Router } from 'express';
import { createNewOrigenFondos, deleteOrigenFondos, getOrigensFondos, updateOrigenFondos } from '../controllers/origenFondos';

const router = Router();

router.get('/origenFondos', getOrigensFondos);
router.post('/origenFondos', createNewOrigenFondos);
router.put('/origenFondos/:id', updateOrigenFondos);
router.delete('/origenFondos/:id', deleteOrigenFondos);

export default router;
