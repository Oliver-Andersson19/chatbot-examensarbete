import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";


async function scrapeURL(url) {
    const loader = new CheerioWebBaseLoader(url);
    console.log(loader)
    const data = await loader.load();

    
    return data;
}


export default { scrapeURL };
