const { Configuration, OpenAIApi } = require("openai");
const { calculateDateDiff } = require("../config/Date_Formatting");

const paces = [
  { label: "Slow & Easy", value: "slowAndEasy" },
  { label: "Medium", value: "medium" },
  { label: "Fast-paced", value: "fastPaced" },
];

const getPaceLabel = (currentPaceValue) => {
  paces.find((pace) => pace === currentPaceValue);
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = (req) => {
  const { country, days, travelers, budget } = req.body;

  const promptTemplate =
    "Plan a AAAA days detailed trip iternary to BBBB for CCCC people, " +
    "the budget for the trip is EEEE INR, also provide" +
    "tourist attractions, dining options, and activities for each day of the trip in a descriptive paragraph and" +
    "give me the response in markdown format";
  return promptTemplate
    .replace("AAAA", days)
    .replace("BBBB", country)
    .replace("CCCC", travelers)
    .replace("EEEE", budget)
    .replace("FFFF", country);
};

/* "Plan a AAAA days detailed trip iternary to BBBB for CCCC people, " +
    "the budget for the trip is EEEE INR, also provide" +
    "tourist attractions, dining options, and activities for each day of the trip and also provide the cost for each activity." +
    "Provide a list of prominent places in FFFF in a list." +
    "give me the response in markdown format"; */

module.exports.plan = async (req, res) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req),
      temperature: 0.6,
      max_tokens: 2048,
    });

    res.status(200).json({
      result: completion.data.choices[0].text,
    });
  } catch (Err) {
    console.log(`Error while preparing trip plan: ${Err}`);
    return res.status(500).json(Err);
  }
};

/* 
<LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        disablePast
        label="Start date"
        openTo="year"
        views={['year', 'month', 'day']}
        inputFormat="MM/dd/yyyy"
        value={startDate}
        onChange={(value: string | null) =>
        setFieldValue('startDate', value)
        }
        renderInput={(params) => (
        <TextField
            {...params}
            error={touched.startDate && Boolean(errors.startDate)}
            fullWidth
            helperText={touched.startDate && errors.startDate}
            id="startDate"
            name="startDate"
            required
        />
        )}
    />
    <DatePicker
        disablePast
        label="End date"
        openTo="year"
        views={['year', 'month', 'day']}
        inputFormat="MM/dd/yyyy"
        value={endDate}
        onChange={(value: string | null) =>
        setFieldValue('endDate', value)
        }
        renderInput={(params) => (
        <TextField
            {...params}
            error={touched.endDate && Boolean(errors.endDate)}
            fullWidth
            helperText={touched.endDate && errors.endDate}
            id="endDate"
            name="endDate"
            required
        />
        )}
    />
</LocalizationProvider>
*/
