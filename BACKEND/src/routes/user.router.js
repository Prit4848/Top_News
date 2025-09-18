import {Router} from 'express'
const router = Router()
import * as userController from "../controller/user.controller.js"
import * as userMiddlewear from "../middlewear/user.middlewear.js"
import {uploadDisk} from '../middlewear/multer.js'


router.post("/register",userMiddlewear.registerUserValidation,userController.createUserController)

router.post("/login",userMiddlewear.loginUserValidation,userController.loginUserController)

router.get('/profile',userMiddlewear.authUserMiddleweare,userController.profile)

router.get("/logout",userMiddlewear.authUserMiddleweare,userController.logout)

router.post('/contactus',userMiddlewear.authUserMiddleweare,userMiddlewear.contactUsValidator,userController.contactus)

router.post('/google-login',userController.googleLoginController)

router.post('/upload-profile',uploadDisk.single('profile'),userMiddlewear.authUserMiddleweare,userController.updateProfile);

router.post("/forgot-password",userController.ForgotPassword);

router.post('/enter-otp',userController.Enter_Otp);

router.post('/change_pass',userController.change_Password);

router.get('/logs/:email',userController.getUserLogs);

router.get('/logs',userController.getAllUserLogs);

export default router;