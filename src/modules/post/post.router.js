import { Router } from 'express';
import auth from '../../Middleware/authentication.js';
import validation from '../../Middleware/validation.js';
import { fileUpload } from '../../services/multer.js';
import * as postController from './controller/post.js';
import * as validators from './post.validation.js'
import commentRouter from '../comment/comment.router.js'
import replyRouter from '../Reply/Reply.router.js'
const router = Router();
router.use('/:post_id/comment',commentRouter)
router.use('/:post_id/comment/:comment_id/reply',replyRouter)
router.get('/',auth(),postController.getAllPosts)
router.get('/owner',auth(),postController.getAllPostsOwner)
router.get('/socialuser/:userId',auth(),validation(validators.userIdSchema),postController.getAllPostsPublicUser)
router.post('/',auth(),fileUpload().array('images',10),validation(validators.addPostSchema), postController.addPost);
router.put("/:post_id/update",auth(),fileUpload().array('images',10),validation(validators.updatePostSchema), postController.updatePost);
router.patch("/:post_id/delete",auth(),validation(validators.postIdSchema), postController.deletePost);
router.patch('/:post_id/react',auth(),validation(validators.reactPostSchema),postController.likePost)
router.patch('/:post_id/unlike',auth(),validation(validators.postIdSchema),postController.unlikePost)
router.patch('/:post_id',auth(),validation(validators.postPrivacySchema),postController.privatePost)
export default router;