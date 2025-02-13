import {Router} from 'express'
const router = Router()
import * as newsMiddlewear from '../middlewear/news.middlewear.js'
import * as userMiddlewear from '../middlewear/user.middlewear.js'
import * as newsController from '../controller/news.controller.js'

router.post('/getnews',[userMiddlewear.authUserMiddleweare,newsMiddlewear.newsPromtValidation],newsController.getnews)

router.post('/moredescription',[userMiddlewear.authUserMiddleweare,newsMiddlewear.newsPromtValidation],newsController.getmoredescription)

router.post('/texttospeech',[userMiddlewear.authUserMiddleweare,newsMiddlewear.newsPromtValidation],newsController.getTextToSpeech)

export default router;