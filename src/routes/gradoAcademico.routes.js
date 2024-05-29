import {Router} from 'express';

import { createNewGradoAcademico, deleteGradoAcademico, getGradosAcademicos, updateGradoAcademico } from '../controllers/gradoAcademicoController'

const router = Router();


router.get('/gradoAcademico',getGradosAcademicos);
router.post('/gradoAcademico',createNewGradoAcademico);
router.delete('/gradoAcademico/:id',deleteGradoAcademico);
router.put('/gradoAcademico/:id',updateGradoAcademico);

export default router;