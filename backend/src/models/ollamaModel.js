import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { Ollama } from "langchain/llms/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

import { Document } from "langchain/document";
import chatbotModel from "./chatbotModel.js";
import { PromptTemplate } from "@langchain/core/prompts";

const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2",
    temperature: 0.5,
});


// You are a chatbot implemented on Visimedias webpage made to answer customers questions about Visimedia.
// Answers should be helpful and short. Only answer questions you know the answer to.

// Function to create a new RetrievalQAChain instance for a given ID
async function createChainForId(id) {
    const chatbotInformation = await chatbotModel.getChatbotInformation(id)
    const url = chatbotInformation[0].FAQ

    console.log(url)

        
    const loader = new CheerioWebBaseLoader(url);
    const data = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const allSplits = await textSplitter.splitDocuments(data);


    const embeddings = new OllamaEmbeddings();
    const vectorStore = await MemoryVectorStore.fromDocuments(
        allSplits,
        embeddings
    );

    const promptTemplate = `
    You are a helpful chatbot implemented on a Website. Limit your answers to a maximum of 2 sentences.
    If needed use the content of the website provided in the context to answer the humans question. Do not mention the provided context.
    Do not use the content of the context if it is not relevant to the question.
    If you cant find an answer in the context do not try to make up an answer simply say that you could not find an answer to the humans question.
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