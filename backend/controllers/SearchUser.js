import prisma from "../../prisma/index.js";

export async function searchUsers(req, res) {
    try {
        const { query } = req.query;
        const userId = req.user.id;

        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "Search query is required" });
        }

        // Sanitize and prepare the search term
        const searchTerm = query.toLowerCase();

        // Fetch users the logged-in user already has conversations with
        const existingConversations = await prisma.conversation.findMany({
            where: {
                userIDs: {
                    has: userId, // Fetch conversations where the user is a participant
                },
                isGroup: false, // Only check one-on-one conversations
            },
            select: {
                userIDs: true, // Select only user IDs
            },
        });

        // Extract the IDs of users the logged-in user is already in conversation with
        const existingUserIds = new Set(
            existingConversations.flatMap(conversation =>
                conversation.userIDs.filter(id => id !== userId) // Exclude the logged-in user's ID
            )
        );

        // Perform the search, excluding users in existing conversations
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: userId, // Exclude the logged-in user
                    notIn: Array.from(existingUserIds), // Exclude users in existing conversations
                },
                OR: [
                    {
                        username: {
                            contains: searchTerm,
                            mode: "insensitive", // Case-insensitive search
                        },
                    },
                    {
                        name: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    name: "asc", // Prioritize name matches first
                },
                {
                    username: "asc", // Then sort by username
                },
            ],
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error searching users:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
