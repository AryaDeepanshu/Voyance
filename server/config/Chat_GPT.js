import { Configuration, OpenAIApi } from "openai";
import { calculateDateDiff, getPaceLabel } from "../../commons";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = (req) => {
  const { country, endDate, pace, startDate, travelers } = req.body;
  const promptTemplate =
    "Plan a AAAA days trip to BBBB for CCCC people, " +
    "pace should be DDDD and give me an overall cost estimate at the end.";
  return promptTemplate
    .replace("AAAA", calculateDateDiff(startDate, endDate).toString())
    .replace("BBBB", country)
    .replace("CCCC", travelers)
    .replace("DDDD", getPaceLabel(pace));
};
