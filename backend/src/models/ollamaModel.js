import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "langchain/llms/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import chatbotModel from "./chatbotModel.js";
import { PromptTemplate } from "@langchain/core/prompts";

const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "mistral",
    temperature: 0.5,
});


// You are a chatbot implemented on Visimedias webpage made to answer customers questions about Visimedia.
// Answers should be helpful and short. Only answer questions you know the answer to.

// Function to create a new RetrievalQAChain instance for a given ID
async function createChainForId(id) {
    const chatbotInformation = await chatbotModel.getChatbotInformation(id)
    const faq = chatbotInformation[0].FAQ

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const allSplits = await textSplitter.splitDocuments([
        new Document({ pageContent: faq})
    ]);


    const embeddings = new OllamaEmbeddings();
    const vectorStore = await MemoryVectorStore.fromDocuments(
        allSplits,
        embeddings
    );

    const promptTemplate = `
    You are a helpful chatbot implemented on a Website.
    If needed use the following pieces of frequently asked questions in the context to answer the question at the end.
    If you cant find an answer in the context, just say that you don't know, don't try to make up an answer.
    Answer can max be 1 sentence.
    \n\nContext: {context}\n\nQuestion: {question}\nHelpful Answer:`;
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