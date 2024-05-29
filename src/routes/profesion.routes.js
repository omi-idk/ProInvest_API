import { Router } from 'express';
import { createNewProfesion, deleteProfesion, getProfesiones, updateProfesion } from '../controllers/profesionController';

const router = Router();

router.get('/profesion', getProfesiones);
router.post('/profesion', createNewProfesion);
router.put('/profesion/:id', updateProfesion);
router.delete('/profesion/:id', deleteProfesion);

export default router;
