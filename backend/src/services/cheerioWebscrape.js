import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";


// async function scrapeURL(url) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const html = await response.text();
//         return html;
//     } catch (error) {
//         console.error('Error fetching the page:', error);
//         return null;
//     }
// }

async function scrapeURL(url) {
    const loader = new CheerioWebBaseLoader(url);
    console.log(loader)
    const data = await loader.load();

    
    return data;
}


export default { scrapeURL };
