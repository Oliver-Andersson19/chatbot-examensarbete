async function scrapeURL(url) {
    const response = await fetch(url);
    return await response.text();
}


export default { scrapeURL };
