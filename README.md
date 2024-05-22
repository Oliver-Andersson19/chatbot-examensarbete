# Chatbot Examensarbete

Detta projekt utgör mitt examensarbete som sträckte sig över 6 veckor och motsvarade 30
YH-poäng.

Sammanfattningsvis har utvecklingen av chatboten varit framgångsrik och levererat en
fungerande lösning för att förbättra användarinteraktionen på webbplatser. Genom att
integrera enkelhet, prestanda och felhantering har chatboten möjliggjort snabb och tillgänglig
support för användare. Den mest lämpliga AI-modellen visade sig vara LLama 3, som valdes
för dess prestanda och kostnadseffektivitet. Beslutet att använda en lokal AI-modell istället
för OpenAI’s API var på grund av kostnadsskäl. För att AI-modellen skulle kunna ge
personliga och korrekta svar om företagen implementerades en lösning där användare klistrar
in URLen till sin FAQ/Om-sida och sedan låter AI-modellen använda den informationen.
Data om företagen och chatbotens inställningar lagrades i en SQL-databas, vilket
underlättade strukturerad datalagring.

- Backend är Node.js + Express för att hantera API-rutter och HTTP/HTTPS-förfrågningar.

- Använder en SQL-databas för lagring utav anpassningar och inställningar gjorda för chatbotsen.

- JWT (JSON Web Token) för autentisering av användarkonton.

- Lokal AI-modell (Llama 3 av Meta AI)

- Byggverktyget för chatbotsen är utvecklat i React.js + TailwindCSS.

# Bilder

<p align="center">
  <img src="docs/images/start.png" width="350" title="hover text">
  <img src="docs/images/start.png" width="350" alt="start page">
</p>
