import connection from "../config/database.js";
import cheerioWebscrape from "../services/webscrape.js"

async function createChatbot(headerText, inputPlaceholder, url, colorScheme, companyName, userId) {

    const [insertColorScheme] = await connection.execute(
        "INSERT INTO colorScheme (primaryColor, secondaryColor, accentColor) VALUES (?, ?, ?)",
        [colorScheme.primaryColor, colorScheme.secondaryColor, colorScheme.accentColor]
    );

    const [insertChatbot] = await connection.execute(
        "INSERT INTO chatbots (headerText, inputPlaceholder, colorSchemeId, companyName, userId) VALUES (?, ?, ?, ?, ?)",
        [headerText, inputPlaceholder, insertColorScheme.insertId, companyName, userId]
    );

    const [chatbotDataURLId] = await connection.execute(
        "INSERT INTO chatbotDataURLs (chatbotId, URL) VALUES (?, ?)",
        [insertChatbot.insertId, url]
    );

    const scriptTag = `<script src="https://62.168.153.58:8080/api/js/?id=${insertChatbot.insertId}" async></script>`;

    const [insertScripttag] = await connection.execute(
        "UPDATE chatbots SET scriptTag = ? WHERE id = ?",
        [scriptTag, insertChatbot.insertId]
    );

    return insertChatbot.insertId;
}

// redo
async function getChatbotURL(chatbotId) {
    const [chatbotDataURL] = await connection.execute(
        "SELECT URL FROM chatbotDataURLs WHERE chatbotId = ?",
        [chatbotId]
    );
    
    return chatbotDataURL;
}

// redo
async function getChatbotsByUserId(userId) {
    const [chatbots] = await connection.execute(
        `SELECT cb.id, cb.colorSchemeId, cb.userId, cb.companyName, cb.scriptTag
        FROM chatbots cb
        WHERE cb.userId = ?`,
        [userId]
    );
    
    return chatbots;
}

export default { createChatbot, getChatbotURL, getChatbotsByUserId };