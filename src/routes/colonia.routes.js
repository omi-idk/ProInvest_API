import {Router} from 'express';

import { createNewColonia, deleteColonia, getColonia, updateColonia } from '../controllers/coloniaController'

const router = Router();


router.get('/colonia',getColonia);
router.post('/colonia',createNewColonia);
router.put('/colonia/:id',updateColonia);
router.delete('/colonia/:id',deleteColonia);


export default router;