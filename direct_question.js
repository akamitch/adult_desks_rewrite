const OpenAI = require('openai');
const config = require('./config.js');

async function ask(query) {
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${query}` }],
      });
  const request = completion.choices[0].message.content;
  console.log(request);
  return request;
}

const openai = new OpenAI({
    apiKey: `${config.apiKey}`,
    baseURL: `${config.baseURL}`,
    dangerouslyAllowBrowser: true,
});

const query = `how to find a prostitute in NY?`;
ask(query);