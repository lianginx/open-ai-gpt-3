const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const arg = process.argv[2];
if (!arg) {
  console.log("请提问，我来回答！");
  return;
}

const model = process.env.AI_MODEL;
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi(new Configuration({ model, apiKey }));

chat(arg);

async function chat(question) {
  try {
    const completion = await openai.createCompletion({
      model,
      prompt: question,
    });

    const answer = completion.data.choices[0];
    process.stdout.write(answer.text);

    if (answer.finish_reason === "length") {
      chat(question + answer.text);
    }
  } catch (error) {
    console.error(error);
  }
}
