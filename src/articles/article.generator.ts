const { Configuration, OpenAIApi } = require("openai");
import { trim } from "lodash";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateArticleContent(prompt: string) {
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

  return trim(gptResponse.data.choices[0].text);
}

export default { generateArticleContent };
