import connection from "../config/database.js";


async function createChatbot(faq, colorScheme, userId) {
    
    const [insertColorScheme] = await connection.execute(
        "INSERT INTO colorScheme (primaryColor, secondaryColor, accentColor) VALUES (?, ?, ?)",
        [colorScheme.primaryColor, colorScheme.secondaryColor, colorScheme.accentColor]
    );

    const [insertChatbotInformation] = await connection.execute(
        "INSERT INTO chatbotInformation (FAQ) VALUES (?)",
        [faq]
    );

    const [insertChatbot] = await connection.execute(
        "INSERT INTO chatbots (chatbotInformationId, colorSchemeId, userId) VALUES (?, ?, ?)",
        [insertChatbotInformation.insertId, insertColorScheme.insertId, userId]
    );

    return insertChatbot.insertId;
}


async function getChatbotInformation(chatbotId) {
    const [chatbotInformation] = await connection.execute(
        "SELECT ci.FAQ FROM chatbots cb JOIN chatbotInformation ci ON cb.chatbotInformationId = ci.id WHERE cb.id = ?",
        [chatbotId]
    );
    
    return chatbotInformation;
}

export default { createChatbot, getChatbotInformation };