import prisma from "../../prisma/index.js";
import cookieToken from "../utils/cookiesToken.js";

export const getAllUser = async (req, res) => {
  try {
    const loggedUser = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: loggedUser,
        },
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        password: false,
      },
    });

    if (!users) {
      return res.status(401).json({ data: "No user found" });
    }

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
};

export const updateUser = async (req, res) => {
  const { id, data } = req.user;
  const updated = await prisma.user.update({
    where: { id },
    data,
  });

  if (!updated) {
    return res.status(400).json("Unable to update user");
  }

  cookieToken(updated, res);
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id not provided" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {},
    });
  } catch (error) {}
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "id not provided" });
    }
    const userExists = await prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      return res.status(400).json({
        message: "User is not found in database",
      });
    }
    const isDeleted = await prisma.user.delete({
      where: { id },
    });

    if (!isDeleted) {
      return res.status(400).json("Unable to delete Try again!");
    }

    // try {
    //   res.clearCookie("token");
    //   res.json({
    //     Success: true,
    //   });
    // } catch (error) {
    //   throw new Error(error);
    // }
    res.status(200).json({ info: "Account deleted" });
  } catch (error) {
    throw new Error(error);
  }
};

export const CraeteNewUserConversations = async (req, res) => {
  const senderId = req.user.id;
  const { id: receiverId } = req.params;

  if ((!senderId, !receiverId)) {
    return res.status(200).json({ error: "id not provided" });
  }

  const userExists = await prisma.user.findUnique({
    where:{id:receiverId}
  });
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  let conversation = await prisma.conversation.findFirst({
    where: {
      userIDs: {
        hasEvery: [senderId, receiverId], // Check if both sender and receiver are participants
      },
      isGroup:false
    },
  });

  // Check if user is already in the conversation
  if (conversation) {
    return res.status(400).json({ error: "Users is already in the conversation" });
  }

  conversation = await prisma.conversation.create({
    data: {
        userIDs: [senderId, receiverId], // Initialize with sender and receiver IDs
    },
});

  res.status(200).json({ message: "User added to conversation", conversation });

};

export const getConversationsAndGroupsByUser = async (req, res) => {
  const userId = req.user.id; // Current user ID

  if (!userId) {
    return res.status(409).json({ error: "User ID not found" });
  }

  try {
    // Fetch all conversations the user is part of
    const conversations = await prisma.conversation.findMany({
      where: {
        userIDs: {
          has: userId, // Check if userId is in userIDs array
        },
      },
      include: {
        groupSettings: true, // Include group settings for group-related data
        GroupRole: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!conversations || conversations.length === 0) {
      return res
        .status(404)
        .json({ error: "No conversations or groups found for the user." });
    }

    // Extract unique user IDs from one-to-one conversations (excluding the current user)
    const uniqueUserIds = [
      ...new Set(
        conversations
          .filter((conversation) => !conversation.isGroup) // Only one-to-one conversations
          .flatMap((conversation) =>
            conversation.userIDs.filter((id) => id !== userId)
          ) // Exclude current user ID
      ),
    ];

    // Fetch user details
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: uniqueUserIds,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        updatedAt: true,
      },
    });

    // Structure group details
    const groups = conversations
      .filter((conversation) => conversation.isGroup)
      .map((group) => ({
        id: group.id,
        name: group.name || "Unnamed Group",
        description: group.groupSettings?.description || null,
        adminUserIds: group.groupSettings?.adminUserIds || [],
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
      }));

    // Fetch latest messages for all conversations
    const latestMessagesPromises = conversations.map(async (conversation) => {
      const latestMessage = await prisma.message.findFirst({
        where: {
          conversationId: conversation.id,
        },
        orderBy: {
          createdAt: "desc", // Fetch the most recent message
        },
      });

      return {
        conversationId: conversation.id,
        latestMessage: latestMessage
          ? {
              text: latestMessage.text,
              createdAt: latestMessage.createdAt,
              senderId: latestMessage.senderId,
            }
          : null,
      };
    });

    const latestMessages = await Promise.all(latestMessagesPromises);

    // Merge users and groups
    const mergedData = [
      ...users.map((user) => ({
        ...user,
        type: "user",
        latestMessage: latestMessages.find((msg) =>
          conversations.some(
            (conv) => conv.id === msg.conversationId && !conv.isGroup && conv.userIDs.includes(user.id)
          )
        )?.latestMessage,
      })),
      ...groups.map((group) => ({
        ...group,
        type: "group",
        latestMessage: latestMessages.find((msg) =>
          msg.conversationId === group.id
        )?.latestMessage,
      })),
    ];

    // Sort by updatedAt (or createdAt as a fallback) in descending order
    mergedData.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

    // Send response
    res.status(200).json({
      data: mergedData,
    });
  } catch (error) {
    console.error("Error fetching conversations and groups:", error);
    res.status(500).json({
      error: "An error occurred while fetching conversations and groups.",
    });
  }
};
