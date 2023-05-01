import { Router } from 'express';
import auth from '../../Middleware/authentication.js';
import validation from '../../Middleware/validation.js';
import { fileUpload, validationObject } from '../../services/multer.js';
import * as userController from './controller/user.js';
import * as validators from './user.validation.js'
import userInfo from '../../Utlis/userDeviceInfo.js'

const router = Router();
router.get('/profile',auth(),userController.userOwnerProfile)
router.get('/:userId/profile',auth(),validation(validators.idScehma),userController.userPublicProfile)
router.patch("/update",validation(validators.updateUserScehma),auth(), userController.updateUser);
router.patch("/changepassword",validation(validators.changePasswordUserScehma),auth(),userInfo, userController.changePasswordUser);
router.patch("/delete",auth(), userController.deleteUser);
router.get("/recovery/:token",validation(validators.recoverUserScehma), userController.recoverUser);
router.patch("/uploadpic",auth(),fileUpload({customValidation:[...validationObject.image]}).single('profile'),validation(validators.uploadPictureSchema),userController.uploadPic);
router.patch("/uploadcover",auth(),fileUpload({customValidation:[...validationObject.image]}).single('cover'),validation(validators.uploadPictureSchema),userController.uploadCover);
router.get("/connections",auth(),userController.getUserConnections);
router.patch("/requestconnection/:userId",auth(),validation(validators.idScehma),userController.requestConnection);
router.patch("/acceptconnection/:userId",auth(),validation(validators.acceptconnectionScehma),userController.acceptConnection);
router.patch("/removeconnection/:userId",auth(),validation(validators.idScehma),userController.deleteConnection);
router.get("/mutalconnection/:userId",auth(),validation(validators.idScehma),userController.mutalConnection);
export default router;