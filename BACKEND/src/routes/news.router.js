import {Router} from 'express'
const router = Router()
import * as newsMiddlewear from '../middlewear/news.middlewear.js'
import * as userMiddlewear from '../middlewear/user.middlewear.js'
import * as newsController from '../controller/news.controller.js'

router.get('/getnews',userMiddlewear.authUserMiddleweare,newsMiddlewear.newsPromtValidation,newsController.getnews)

export default router;