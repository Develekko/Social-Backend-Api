import { Router } from 'express'
import auth from '../../Middleware/authentication.js'
import validation from '../../Middleware/validation.js'
import  userInfo  from '../../Utlis/userDeviceInfo.js'
import * as authControler from './controller/auth.js'
import * as validators from './auth.validation.js'

const router = Router()
router.post('/signup',validation(validators.signUpScehma),authControler.signUp)
router.post('/signin',validation(validators.signInScehma),authControler.signIn)
router.post('/refreshtoken/:token',validation(validators.refreshTokenScehma),authControler.refreshToken)
router.patch('/signout',auth(),authControler.signOut)
router.get('/confirmEmail/:token',validation(validators.confirmEmailSchema),authControler.confirmEmail)
router.get('/requestNewEmail/:token',authControler.requestNewEmail)
router.post('/forgotpassword',userInfo,validation(validators.forgotPasswordSchema),authControler.forgotPassword)
router.post('/resetpassword/:email',validation(validators.resetPasswordSchema),authControler.resetpassword)
export default router;