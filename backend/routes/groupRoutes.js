import express from 'express';
import { assignRole, removeRole, addUserToGroup, fetchAllMembers, } from '../controllers/GroupController.js';
import isLoggedIn from '../middleware/isUserLogged.js';

const router = express.Router();

// Assign a role to a user in a group
router.post('/assign-role', assignRole);

// Remove a user role in a group
router.delete('/remove-role/:userId/:conversationId', isLoggedIn,removeRole);

// Add a user to a group
router.post('/add-user', isLoggedIn,addUserToGroup);

router.get("/:id/members",isLoggedIn,fetchAllMembers)

export default router;
