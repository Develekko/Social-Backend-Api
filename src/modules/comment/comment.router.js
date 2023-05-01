import { Router } from 'express';
import auth from '../../Middleware/authentication.js';
import validation from '../../Middleware/validation.js';
import { fileUpload } from '../../services/multer.js';
import * as commentController from './controller/comment.js';
import * as validators from './comment.validation.js'
const router = Router({mergeParams:true});
router.post("/",auth(),fileUpload().single('image'),validation(validators.addCommentSchema), commentController.addComment);
router.put("/:comment_id/",auth(),fileUpload().single('image'),validation(validators.updateCommentSchema), commentController.updateComment);
router.patch("/:comment_id/delete",auth(),validation(validators.IdSchema), commentController.deleteComment);
router.patch('/:comment_id/react',auth(),validation(validators.reactCommentSchema),commentController.likeComment)
router.patch('/:comment_id/unlike',auth(),validation(validators.IdSchema),commentController.unlikeComment)
export default router;