import {Router} from 'express'
const router = Router()

import * as adminMiddlewear from '../middlewear/admin.middlewear.js'
import * as adminController from '../controller/admin.controller.js'

router.post('/login',adminMiddlewear.loginAdminValidation,adminController.loginAdmin)

router.post('/subscribe',adminMiddlewear.SubscribeValidator,adminController.addSubscribers)

export default router;