import {Router} from 'express'
const router = Router()
import * as userController from "../controller/user.controller.js"
import * as userMiddlewear from "../middlewear/user.middlewear.js"


router.post("/register",userMiddlewear.registerUserValidation,userController.createUserController)

router.post("/login",userMiddlewear.loginUserValidation,userController.loginUserController)

router.get("/")

export default router;