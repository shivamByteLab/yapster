import prisma from "../../prisma/index.js";
import { findOrCreateConversation } from "./Conversation.js";

export const sendMessage = async (req, res) => {
  const { text } = req.body;
  const senderId = req.user.id;
  const { id: receiverId } = req.params;

  if ((!senderId, !receiverId)) {
    return res.status(200).json({ error: "id not provided" });
  }

  const conversation = await findOrCreateConversation(senderId, receiverId);

  const sendMsg = await prisma.message.create({
    data: {
      conversation: { connect: { id: conversation.id } },
      sender: { connect: { id: senderId } },
      receiver: { connect: { id: receiverId } },
      text, // The actual message content
    },
  });

  res.status(200).json({ message: "message sent", data: sendMsg });
};

export const sendMessageToGroup = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.user.id;
    const { id: conversationId } = req.params;

    // Verify the conversation is a group
    if (!senderId) {
      return res.status(400).json({ info: "No id provided" });
    }
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || !conversation.isGroup) {
      throw new Error("Invalid group conversation");
    }

    // Create the group message
    const message = await prisma.message.create({
      data: {
        text,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: senderId }},
      },
    });

    return res.status(200).json({ data: message });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send message to group");
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { id: chatWith } = req.params;

    if (!senderId || !chatWith) {
      return res.status(400).json({ error: "plz provide Id's" });
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        userIDs: {
          hasEvery: [senderId, chatWith],
        },
        isGroup: false,
      },
      include: {
        Message: true,
      },
    });

    if (!conversation) {
      return res
        .status(200)
        .json({ info: "No conversation found between the users" });
    }

    return res.status(200).json({ data: conversation.Message });
  } catch (error) {
    throw new Error("Unable to fatch messages", error);
  }
};

export const deleteMessage = async (req,res) => {
  try {
    const {id} = req.body;

    const messageExist = await prisma.message.findUnique({
      where:{
        id
      }
    })

    if(!messageExist){
      return res.status(400).json({message:"no message exists"})
    }

    const deleted = await prisma.message.delete({
    where: { id },
    });

    if(!deleted){
      return res.status(400).json({message:"unable to delete"})
    }

    res.status(200).json({message:"deleted",data:deleted})
  } catch (error) {
    res.status(400).json({error:"Server error!"})
  }
};

export const fetchGroupMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Validate if the conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    // Fetch all messages for the conversation
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: { select: { id: true, username: true, avatar: true } }, // Include sender details
      },
      orderBy: { createdAt: "asc" }, // Order by creation time
    });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




//                                                   Limited message fetch

// export const fetchGroupMessages = async (req, res) => {
//   const { conversationId } = req.params;
//   const { cursor } = req.query; // Cursor for pagination

//   try {
//     // Validate if the conversation exists
//     const conversation = await prisma.conversation.findUnique({
//       where: { id: conversationId },
//     });

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found." });
//     }

//     // Fetch messages with pagination
//     const messages = await prisma.message.findMany({
//       where: { conversationId },
//       include: {
//         sender: { select: { id: true, username: true, avatar: true } }, // Include sender details
//       },
//       orderBy: { createdAt: "asc" }, // Order by creation time (newest first)
//       take: 20, // Fetch 15 messages
//       skip: cursor ? 1 : 0, // Skip the cursor itself if provided
//       ...(cursor && { cursor: { id: cursor } }), // Set the cursor for pagination
//     });

//     res.status(200).json({ data: messages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
