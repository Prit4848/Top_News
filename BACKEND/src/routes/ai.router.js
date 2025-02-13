import {Router} from 'express'
const router = Router()

import * as userMiddlewear from '../middlewear/user.middlewear.js'
import * as aiMiddlewear from '../middlewear/ai.middlewear.js'
import * as aiController from '../controller/ai.controller.js'

router.post('/getsummery',userMiddlewear.authUserMiddleweare,aiMiddlewear.newsPromtValidation,aiController.getSummery)

export default router;