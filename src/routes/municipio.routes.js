import {Router} from 'express';

import { createNewMunicipio, deleteMunicipio, getMunicipios, updateMunicipio } from  '../controllers/municipioController'


const router = Router();

router.get('/municipio',getMunicipios);
router.post('/municipio',createNewMunicipio);
router.put('/municipio/:id',updateMunicipio);
router.delete('/municipio/:id', deleteMunicipio);


export default router;