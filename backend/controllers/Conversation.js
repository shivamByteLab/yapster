// import prisma from "../../prisma/index.js";

// export const createConversation = async (name, userIDs, isGroup = false) => {
//     return prisma.conversation.create({
//       data: {
//         name,
//         userIDs,
//         isGroup,
//       },
//     });
//   };
  
//   export const getConversationById = async (id) => {
//     return prisma.conversation.findUnique({
//       where: { id },
//       include: {
//         Message: true,
//       },
//     });
//   };
  
//   export const updateConversation = async (id, name) => {
//     return prisma.conversation.update({
//       where: { id },
//       data: { name },
//     });
//   };
  
//   export const deleteConversation = async (senderID,receiverID) => {
//     return prisma.conversation.delete({
//       where: {
//         userIDs: {
//             hasEvery: [senderID, receiverID], // Check if both sender and receiver are participants
//         },
//     },
//     });
//   };
  
import prisma from '../../prisma/index.js';

// Controller to create or find a conversation between two users
export const findOrCreateConversation = async (senderID, receiverID) => {
    try {
        // Check if a conversation already exists between the users
        let conversation = await prisma.conversation.findFirst({
            where: {
                userIDs: {
                    hasEvery: [senderID, receiverID], // Check if both sender and receiver are participants
                },
            },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    userIDs: [senderID, receiverID], // Initialize with sender and receiver IDs
                },
            });
        }

        return conversation;
    } catch (error) {
        throw new Error(error);
    }
};

// export const AddNewUserToConversationGroup = async (req, res) => {
//     try {
//       const { conversationId } = req.params;
//       const { userId } = req.body;
  
//       if (!userId) {
//         return res.status(400).json({ error: "User ID is required" });
//       }
  
//       const conversation = await Conversation.findById(conversationId);
  
//       if (!conversation) {
//         return res.status(404).json({ error: "Conversation not found" });
//       }
  
//       const userExists = await User.findById(userId);
  
//       if (!userExists) {
//         return res.status(404).json({ error: "User not found" });
//       }
  
//       // Check if user is already in the conversation
//       if (conversation.participants.includes(userId)) {
//         return res.status(400).json({ error: "User is already in the conversation" });
//       }
  
//       // Add user to conversation
//       conversation.participants.push(userId);
//       await conversation.save();
  
//       res.status(200).json({ message: "User added to conversation", conversation });
//     } catch (error) {
//       console.error("Error adding user to conversation:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }