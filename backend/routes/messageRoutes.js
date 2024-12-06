import { Router } from "express";
import { deleteMessage, fetchGroupMessages, getMessages, sendMessage, sendMessageToGroup } from "../controllers/Message.js";
import isLoggedIn from "../middleware/isUserLogged.js";

const router = Router();

router.post("/sent/:id",isLoggedIn,sendMessage)//used
router.get("/get/:id",isLoggedIn,getMessages) //used
router.get("/:conversationId/messages", fetchGroupMessages);//used
router.post("/send-group/:id/",isLoggedIn,sendMessageToGroup) //used
// router.get('/latestMessages/',isLoggedIn,getLatestMessage) //used
router.post("/delete/message",isLoggedIn,deleteMessage)

export default router