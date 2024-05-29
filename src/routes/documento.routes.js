import { Router } from 'express';


import { getDocumentos, createNewDocumento, updateDocumento, deleteDocumento } from '../controllers/documentosController';

const router = Router();

router.get('/documentos', getDocumentos);
router.post('/documentos', createNewDocumento);
router.put('/documentos/:id', updateDocumento);
router.delete('/documentos/:id', deleteDocumento);


export default router;
