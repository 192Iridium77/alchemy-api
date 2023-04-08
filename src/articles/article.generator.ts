const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateArticleDescription(prompt: string) {
  const config = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 1,
  });
  console.log(
    "🚀 ~ file: article.generator.ts:17 ~ generateArticleDescription ~ gptResponse:",
    gptResponse.data
  );

  return gptResponse.data.choices[0].text;
}

export default { generateArticleDescription };
