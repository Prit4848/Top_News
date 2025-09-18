import {Router} from 'express'
const router = Router()

import * as adminMiddlewear from '../middlewear/admin.middlewear.js'
import * as adminController from '../controller/admin.controller.js'
import {uploadMemory} from '../middlewear/multer.js'

router.post('/login',adminMiddlewear.loginAdminValidation,adminController.loginAdmin)

router.post('/subscribe',adminMiddlewear.SubscribeValidator,adminController.addSubscribers)

router.post("/sendupdates",uploadMemory.single("image"),adminMiddlewear.authadminMiddlewear,adminController.sendUpdates)

router.get("/profile",adminMiddlewear.authadminMiddlewear,adminController.Profile)

export default router;