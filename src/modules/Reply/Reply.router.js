import { Router } from 'express';
import auth from '../../Middleware/authentication.js';
import validation from '../../Middleware/validation.js';
import { fileUpload } from '../../services/multer.js';
import * as replyController from './controller/Reply.js';
import * as validators from './Reply.validation.js'
const router = Router({mergeParams:true});
router.post("/",auth(),fileUpload().single('image'),validation(validators.addReplayScehma), replyController.addReply);
router.put("/:reply_id/update",auth(),fileUpload().single('image'),validation(validators.updateReplayScehma), replyController.updateReply);
router.patch("/:reply_id/delete",auth(),validation(validators.idScehma), replyController.deleteReply);
router.patch("/:reply_id/react",auth(),validation(validators.reactScehma), replyController.likeReply);
router.patch("/:reply_id/unlike",auth(),validation(validators.idScehma), replyController.unlikeReply);
export default router;