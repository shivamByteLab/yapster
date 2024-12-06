import prisma from "../../prisma/index.js";
import { findtRoles } from "./GroupSettings.js";

// Assign a role to a user in a group
export const assignRole = async (req, res) => {
  const { userId, conversationId, role } = req.body;

  try {
    const assignedRole = await prisma.groupRole.create({
      data: {
        userId,
        conversationId,
        role,
      },
    });

    res
      .status(201)
      .json({ message: "Role assigned successfully", data: assignedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a user role in a group
export const removeRole = async (req, res) => {
  const { userId, conversationId } = req.params;

  try {
    const removedRole = await prisma.groupRole.delete({
      where: {
        userId_conversationId: {
          userId,
          conversationId,
        },
      },
    });

    res
      .status(200)
      .json({ message: "Role removed successfully", data: removedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a user to a group
export const addUserToGroup = async (req, res) => {
  const { usersId, conversationId, role } = req.body;

  try {
    // Fetch the current group information
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, isGroup: true },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Group not found." });
    }

    // Filter out users who are already in the group
    const existingUsers = await prisma.conversation.findFirst({
      where: { id: conversationId },
      select: { userIDs: true },
    });

    const notInGroupUsers = usersId.filter((userId) => !existingUsers.userIDs.includes(userId));

    if (notInGroupUsers.length === 0) {
      return res.status(400).json({ message: "All users are already in the group." });
    }

    // Add users to the group
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { userIDs: { push: notInGroupUsers } },
    });

    // Assign roles to the newly added users
    const rolesPromises = notInGroupUsers.map((userId) =>
      prisma.groupRole.create({
        data: {
          conversationId,
          userId,
          role: role || "MEMBER", // Default to 'member' if no role is provided
        },
      })
    );
    const roles = await Promise.all(rolesPromises);

    // Fetch updated group details
    const updatedGroup = await prisma.conversation.findFirst({
      where: { id: conversationId },
      include: {
        groupSettings: true,
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

    const groupResponse = {
      id: updatedGroup.id,
      name: updatedGroup.name || "Unnamed Group",
      type: "group",
      description: updatedGroup.groupSettings?.description || null,
      adminUserIds: updatedGroup.groupSettings?.adminUserIds || [],
      createdAt: updatedGroup.createdAt,
      updatedAt: updatedGroup.updatedAt,
    };

    res.status(201).json({
      message: "Users added to group successfully.",
      group: groupResponse,
      roles,
    });
  } catch (error) {
    console.error("Error adding users to group:", error);
    res.status(500).json({ error: "Unable to add users to group." });
  }
};



export const fetchAllMembers = async (req, res) => {

  const { id: groupId } = req.params;

  const allMembers = await findtRoles(groupId);

  if (!allMembers) {
    return res.status(404).json({ message: "No Member" });
  }

  res.status(201).json({ data: allMembers });
};
