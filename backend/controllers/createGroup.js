import prisma from "../../prisma/index.js";


const createGroupController = async (req, res) => {
  try {
    const { name, userIds, adminIds, description } = req.body;
    const creatorId = req.user.id;

    // Validate the request payload
    if (!name || !Array.isArray(userIds) || userIds.length === 0 || !creatorId) {
      return res
        .status(400)
        .json({ error: 'Name, at least one user, and creatorId are required.' });
    }

    // Ensure the creator is included in the user list
    if (!userIds.includes(creatorId)) {
      userIds.push(creatorId);
    }

    // Create the group conversation
    const group = await prisma.conversation.create({
      data: {
        name,
        isGroup: true,
        userIDs: userIds,
        groupSettings: {
          create: {
            description,
            adminUserIds: adminIds || [], // Admins for the group
          },
        },
      },
    });

    // Assign the OWNER role to the creator
    await prisma.groupRole.create({
      data: {
        userId: creatorId,
        conversationId: group.id,
        role: 'OWNER',
      },
    });

    // Assign roles to other admins
    if (adminIds && adminIds.length > 0) {
      await Promise.all(
        adminIds
          .filter((adminId) => adminId !== creatorId) // Skip assigning OWNER as ADMIN
          .map((adminId) =>
            prisma.groupRole.create({
              data: {
                userId: adminId,
                conversationId: group.id,
                role: 'ADMIN',
              },
            })
          )
      );
    }

    // Default members to "MEMBER" role
    const nonAdminIds = userIds.filter(
      (id) => id !== creatorId && !adminIds?.includes(id)
    );
    await Promise.all(
      nonAdminIds.map((userId) =>
        prisma.groupRole.create({
          data: {
            userId,
            conversationId: group.id,
            role: 'MEMBER',
          },
        })
      )
    );

    // Return the created group
    return res.status(201).json({
      message: 'Group created successfully',
      group,
    });
  } catch (error) {
    console.error('Error creating group:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export default createGroupController
