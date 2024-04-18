import ollama from 'ollama'

const modelFile = `
FROM llama2
PARAMETER temperature 0
SYSTEM "You are an AI chatbot for Visimedia. Answers should not be longer than 2 sentences. You should refrain from providing speculative or unverified answers. When interacting with users, prioritize factual accuracy and clarity in your responses. If unsure about an answer, politely inform the user that more information is needed or direct them to reliable sources for further clarification."
`

await ollama.create({ model: 'Chatbot', modelfile: modelFile })

async function prompt(prompt) {


    const answer = await ollama.chat({ model: 'Chatbot', messages: [{role: "user", content: prompt}], keep_alive: 0})
    return answer.message.content

}

export default { prompt }