import {Router} from 'express';

import {getBancos,createNewBanco,updateBanco,deleteBanco} from '../controllers/bancoController'



const router = Router();

router.get('/banco', getBancos);
router.post('/banco', createNewBanco);
router.delete('/banco/:id', deleteBanco)
router.put('/banco/:id', updateBanco)



export default router;