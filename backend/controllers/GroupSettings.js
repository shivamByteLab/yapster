import prisma from "../../prisma/index.js";

  
  export const updateGroupSettings = async (id, data) => {
    return prisma.groupSettings.update({
      where: { conversationId:id },
      data,
    });
  };
  
  export const deleteGroupSettings = async (id,data) => {
    return prisma.groupSettings.delete({
      where: { conversationId:id },
      data,
    });
  };

  export const findtRoles = async (id) => {
    const allRoles = await prisma.groupRole.findMany({
      where: { conversationId:id },
      include:{
        user:{select:{
          name:true,
          username:true,
          avatar:true,
        }}
      },orderBy:[
        {
            role: "desc", // Prioritize name matches first
        },
    ],
    });

    return allRoles
  };