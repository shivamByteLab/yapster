import { Router } from "express";
import createGroupController from "../controllers/createGroup.js";
import isLoggedIn from "../middleware/isUserLogged.js";

const router = Router()

router.post("/",isLoggedIn,createGroupController)

export default router