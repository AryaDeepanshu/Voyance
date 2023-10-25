const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey("AIzaSyDBVVxi5MOOZ9aWHYtGq6LlKJESShtYX1g"),
});

const prompt = "Repeat after me: one, two,";

client
  .generateText({
    model: MODEL_NAME,
    prompt: {
      text: "give me a paragraph about the tourist attractions in kurukshetra where i can visit in 10,000 ruppes budget",
    },
  })
  .then((result) => {
    resp = result[0]
    console.log(JSON.stringify(resp.text, null, 2));

  });