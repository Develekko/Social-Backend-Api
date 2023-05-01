import { Router } from 'express';
import auth from '../../Middleware/authentication.js';
import validation from '../../Middleware/validation.js';
import * as userController from './controller/admin.js';
import * as validators from './admin.validation.js'
const router = Router();
router.get("/user/all",userController.getAllUsers)
router.get("/user/online",auth({roles:['admin']}),userController.getOnlineUsers)
router.patch("/blockuser/:id",validation(validators.idScehma),auth({roles:['admin']}), userController.blockUser);
router.patch("/unblockuser/:id",validation(validators.idScehma),auth({roles:['admin']}), userController.unBlockUser);
export default router;