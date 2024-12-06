import { Router } from "express";
import { CraeteNewUserConversations, deleteUser, getAllUser, getConversationsAndGroupsByUser, updateUser } from "../controllers/User.js";
import isLoggedIn from "../middleware/isUserLogged.js";
import { searchUsers } from "../controllers/SearchUser.js";

const router = Router();

router.get('/getusers/',isLoggedIn,getAllUser)
router.post('/update/',isLoggedIn,updateUser)

router.delete('/delete/user/',isLoggedIn,deleteUser)
router.get('/user-interactions/',isLoggedIn, getConversationsAndGroupsByUser); //used
router.get("/search",isLoggedIn,searchUsers) //used
router.post("/newConversation/:id",isLoggedIn,CraeteNewUserConversations)
export default router