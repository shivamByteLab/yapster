import {Router} from "express";
import { logout, SignIn, signup } from "../controllers/Auth.js";
import uploadAvatar from "../middleware/uploadAvatar.js";

const router = Router()

router.post('/signup',signup)
router.route('/login').post(SignIn)
router.route('/logout').post(logout)

export default router