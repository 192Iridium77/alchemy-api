const { Configuration, OpenAIApi } = require("openai");
import { trim } from "lodash";
import { createLogger } from "../services/logger/logger";

const logger = createLogger("ArticleGenerator");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateArticleContent(prompt: string) {
  const config = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  logger.info({ prompt, l: OPENAI_API_KEY.length }, "Generating Article");

  const gptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 200,
    temperature: 1,
  });

  logger.info({ gptResponseDate: gptResponse.data }, "Generated Article");

  return trim(gptResponse.data.choices[0].text);
}

export default { generateArticleContent };
