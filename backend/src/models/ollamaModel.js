import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "langchain/llms/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import webscrape from "../services/webscrape.js";
import cheerio, { text } from 'cheerio';

import { Document } from "langchain/document";
import chatbotModel from "./chatbotModel.js";
import { PromptTemplate } from "@langchain/core/prompts";

const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama3",
    temperature: 0.5,
});



async function createChainForId(id) {
    let url = await chatbotModel.getChatbotURL(id)
    url = url[0].URL

    console.log(url)

    const $ = cheerio.load(await webscrape.scrapeURL(url));

    function extractVisibleText(element) {
        let text = '';
    
        $(element).contents().each((_, node) => {
            if (node.nodeType === 3) {
                text += $(node).text().trim() + ' ';
            } else {
                if (!$(node).is('script, noscript, iframe')) {
                    text += extractVisibleText(node) + ' ';
                }
            }
        });
    
        return text.trim();
    }

    const data = extractVisibleText($('body'));

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const allSplits = await textSplitter.splitDocuments([
        new Document({ pageContent: data }),
    ]);


    const embeddings = new OllamaEmbeddings({model: "llama3"});
    const vectorStore = await MemoryVectorStore.fromDocuments(
        allSplits,
        embeddings
    );

    console.log(data)
    
    const promptTemplate = `
    You are a helpful chatbot implemented on a Website. Limit your answers to a maximum of 2 sentences.
    If needed use the content of the websites FAQ provided in the context to answer the humans question. Do not mention the provided context.
    Do not use the content of the context if it is not relevant to the question.
    \n\nContext: {context}\n\nQuestion: {question}\nShort Answer:`;

    const qaPrompt = PromptTemplate.fromTemplate(promptTemplate);

    const retriever = vectorStore.asRetriever();
    return new RetrievalQAChain({
        combineDocumentsChain: loadQAStuffChain(ollama, {prompt: qaPrompt}),
        retriever: retriever
    });
}


// List of IDs to their respective RetrievalQAChain instances
const chainList = {};


// Function for prompting AI model
async function prompt(query, id) {
    let chain;

    // Check if a chain for this ID already exists in the map
    if (!chainList[id]) {
        // If not, create a new chain and store it in the map
        chain = await createChainForId(id);
        chainList[id] = chain;
    } else {
        // If exists, use the existing chain from the map
        chain = chainList[id];
    }

    try {
        const result = await chain.call({query: query});
        return result.text; // Return the text response
    } catch (error) {
        console.error("Error executing query:", error);
        return null; // Return null if there's an error
    }
}

export default { prompt };