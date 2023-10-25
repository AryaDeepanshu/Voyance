const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey("AIzaSyDBVVxi5MOOZ9aWHYtGq6LlKJESShtYX1g"),
});


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

module.exports.plan = async (req, res) => {
  try {
    client
      .generateText({
        model: MODEL_NAME,
        prompt: {
          text: generatePrompt(req),
        },
      })
      .then((result) => {
        return res.status(200).json(result);

      });
  }catch (Err) {
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
