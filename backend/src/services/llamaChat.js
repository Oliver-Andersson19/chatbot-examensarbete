import {fileURLToPath} from "url";
import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession, ChatPromptWrapper, LlamaChatPromptWrapper} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "../../aiModels", "llama-2-7b-chat.Q8_0.gguf")
});

// const model = new LlamaModel({
//     modelPath: path.join(__dirname, "../models", "mistral-7b-v0.1.Q5_K_M.gguf")
// });

const faq = `
Vad är responsiv webbdesign och varför är det viktigt?
Responsiv webbdesign innebär att en webbsida anpassar sig automatiskt efter olika enheter och skärmstorlekar för att ge en optimal upplevelse för användaren. Det är viktigt eftersom användare använder olika enheter som smartphones, surfplattor och datorer för att komma åt webbsidor.
Vad är skillnaden mellan statiska och dynamiska webbsidor?
Statiska webbsidor visar samma innehåll för alla användare och ändras inte automatiskt baserat på användarens interaktion. Dynamiska webbsidor däremot kan anpassa sig baserat på användarens åtgärder eller annan extern data.
Vad är ett CMS och vilka fördelar finns det med att använda det?
Ett CMS (Content Management System) är en programvara som används för att skapa, redigera och hantera webbinnehåll. Fördelarna är enklare innehållshantering och möjlighet för ägaren av webbsidan att själv uppdatera och publicera nytt innehåll.
Vad är skillnaden mellan HTTP och HTTPS?
HTTP (HyperText Transfer Protocol) är en metod som används för att överföra data mellan en webbserver och en webbläsare. HTTPS (HyperText Transfer Protocol Secure) är en säker version av HTTP som krypterar dataöverföringen, vilket är viktigt för att skydda känslig information såsom användarnas personuppgifter och betalningsinformation.
Vad menas med cross-browser compatibility?
Cross-browser compatibility innebär att en webbsida fungerar korrekt och ser i stort sett likadan ut i olika webbläsare, såsom Chrome, Firefox, Safari och Edge. Alla webbsidor måste testas i olika webbläsare för att säkerställa en enhetlig användarupplevelse då det alltid finns vissa skillnader i utseende och funktioner.
Vilka är de viktigaste sidorna som behövs på webbsidan?
Vanligtvis inkluderar detta startsidan, om oss, produkter/tjänster, kontakt och eventuellt blogg eller nyheter.
Vilka säkerhetsåtgärder behöver implementeras?
De viktigaste åtgärderna är att inkludera SSL-certifikat, regelbundna (automatiska) säkerhetskopior och uppdatering av programvara, etc.
Vilka verktyg eller plattformar används för att bygga och hantera webbsidan?
Vi hanterar många olika plattformar och verktyg men använder helst Webflow eller WordPress för produktion av webbsidor. För e-handel och webbutiker använder vi Shopify, AbiCart eller Ecwid. Vi hanterar såklart anpassad kodning med HTML, CSS, JavaScript, osv. för alla projekt och uppdrag.
Hur lång tid tar det vanligtvis att slutföra en webbsida?
Tidslinjen kan variera beroende på projektets omfattning och komplexitet. Vi kan ge dig en uppskattning baserat på dina specifika behov och krav, men vi har som målsättning att kunna leverera en normal webbsida inom en vecka.
Hur ser processen ut för att skapa en webbsida från början till slut?
Vår process involverar vanligtvis att förstå kundens behov, skapa en design och prototyp, utveckla webbsidan, testa den noggrant och sedan implementera den på lämplig server. Vi försöker alltid hålla en nära dialog med kunden och löpande informera om utvecklingens olika faser.
Vad ingår i priset för att skapa en webbsida?
Normalt ingår design, utveckling, skapande av innehåll, responsiv design för mobila enheter, SEO-optimering, och support beroende på önskemål.
Vad behöver jag som kund bidra med för att skapa webbsidan?
Vi behöver vanligtvis tillgång till relevant innehåll såsom texter, bilder och logotyper från din sida. Dessutom kan feedback och godkännanden behövas under design- och utvecklingsfasen.
Vad är er policy för ändringar och revideringar under projektets gång?
Vi är öppna för att göra ändringar och revideringar enligt dina önskemål, men eventuella stora ändringar som påverkar omfattningen kan påverka projektets tidslinje och pris.
Vilken typ av support kan ni erbjuda efter att webbplatsen har lanserats?
Vi erbjuder olika grader av support efter att din webbplats har lanserats, till exempel tjänster för att uppdatera innehåll på webbplatsen. Det ingår alltid tekniskt underhåll för att din webbsida ska fungera felfritt. Vänligen kontakta oss för att diskutera dina specifika behov av support. Du kan läsa mer och beställa tjänster på sidan om supportavtal.
Vad gäller för upphovsrätt och äganderätt till den färdiga webbsidan?
Du som kund äger vanligtvis rättigheterna till den färdiga webbsidan och dess innehåll. Vi använder alltid licensierade bilder och material som inte bryter mot några bestämmelser om upphovsrätt.
`

const context = new LlamaContext({model});
const session = new LlamaChatSession({
    context,
    promptWrapper: new LlamaChatPromptWrapper(),
    // systemPrompt: `You are a Customer Service chatbot implemented on Visimedias webpage, give only short and helpful answers and the answers shall only be 1 sentence and all answers shall be in swedish`,
    systemPrompt: `You are a helpful, respectful and honest chatbot implemented on Visimedias webpage. Always answer as helpfully as possible, while being safe and no longer answers than 1 sentence and all answers shall be in swedish.  
    Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. 
    Please ensure that your responses are socially unbiased and positive in nature.
    If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. 
    If you don't know the answer to a question, please don't share false information.`
});


export async function prompt(query) {
    return await session.prompt(query, {
        temperature: 0.5
    }) 
}