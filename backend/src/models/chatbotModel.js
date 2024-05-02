import connection from "../config/database.js";


async function createChatbot(faq, colorScheme, companyName, userId) {
    
    const [insertColorScheme] = await connection.execute(
        "INSERT INTO colorScheme (primaryColor, secondaryColor, accentColor) VALUES (?, ?, ?)",
        [colorScheme.primaryColor, colorScheme.secondaryColor, colorScheme.accentColor]
    );

    const [insertChatbotInformation] = await connection.execute(
        "INSERT INTO chatbotInformation (FAQ) VALUES (?)",
        [faq]
    );

    const [insertChatbot] = await connection.execute(
        "INSERT INTO chatbots (chatbotInformationId, colorSchemeId, companyName, userId) VALUES (?, ?, ?, ?)",
        [insertChatbotInformation.insertId, insertColorScheme.insertId, companyName, userId]
    );

    const scriptTag = `<script src="https://62.168.153.58:8080/api/js/?id=${insertChatbot.insertId}" async></script>`;

    const [insertScripttag] = await connection.execute(
        "UPDATE chatbots SET scriptTag = ? WHERE id = ?",
        [scriptTag, insertChatbot.insertId]
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

async function getChatbotsByUserId(userId) {
    const [chatbots] = await connection.execute(
        `SELECT cb.id, cb.colorSchemeId, cb.userId, cb.chatbotInformationId, cb.companyName, cb.scriptTag, ci.FAQ
        FROM chatbots cb
        JOIN chatbotInformation ci ON cb.chatbotInformationId = ci.id
        WHERE cb.userId = ?`,
        [userId]
    );
    
    return chatbots;
}

export default { createChatbot, getChatbotInformation, getChatbotsByUserId };