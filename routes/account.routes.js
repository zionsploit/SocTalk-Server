import { Router } from "express"
import { createAccountInfoController, addAccountController, loginController, getUserDataController, getDataByUsernameController } from '../controllers/account.controllers'
import { AuthenticationTokenLoginMiddleware, AuthenticationTokenCreateAccountMiddleware } from "../token/token"
const router = Router()

router.post('/register', addAccountController)

router.post('/', loginController)

router.get('/', AuthenticationTokenLoginMiddleware, getUserDataController)

router.get('/getData', AuthenticationTokenLoginMiddleware, getDataByUsernameController)

router.post('/accountInfo',AuthenticationTokenCreateAccountMiddleware, createAccountInfoController)
export default router