import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { desktop, largeMobile, mobile, tablet } from "../responsive";
import { ArrowBack } from "@mui/icons-material";

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.div`
  margin: 25px;
  display: flex;
  flex-direction: column;
  padding: 25px 0px 50px 0px;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  align-items: center;
  height: max-content;

  width: 45%;

  ${desktop({
    width: "32%",
  })}

  ${tablet({
    width: "55%",
  })}

  ${largeMobile({
    width: "70%",
  })}

    ${mobile({
    width: "90%",
  })}
`;

const Heading = styled.p`
  font-size: 32px;
  font-family: "Bree Serif", serif;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 85%;
`;

const InputTitle = styled.p`
  font-size: 18px;
  font-family: "Bree Serif", serif;
`;

const InputField = styled.input`
  outline: none;
  border: none;
  background-color: #eee;
  border-radius: 4px;
  padding: 15px 12px;
  font-family: "Noto Serif", serif;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: #ff4b2b;
  color: white;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  padding: 12px 15px;
  width: ${(props) => (props.plan === "planAgain" ? "200px" : "85%")};
  /* width: 250px; */
  border: none;
  font-family: "Noto Serif", serif;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IternaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const IternaryHeading = styled.p`
  font-size: 32px;
  margin-top: 20px;
  font-family: "Bree Serif", serif;
`;

const Container = styled.div`
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const PlanAgainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Plan = () => {
  const [day, setDay] = useState(0);
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState(0);
  const [planning, setPlanning] = useState(false);
  const [response, setResponse] = useState(null);

  const fetchData = async (input) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `${input}`,
        model: "text-davinci-003",
        max_tokens: 2048,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );

    setPlanning(false);
    setResponse(response);
  };

  const plan = () => {
    if (location === "" || day === 0 || budget === 0) return;

    setResponse(null);
    setPlanning(true);
    fetchData(
      `Plan a ${day} day trip iternary to ${location} with Rs. ${budget} budget, provide the result in the following format Day number, popular attractions, plan for morning, afternoon, evening and the estimated cost for each activity in Indian currency.`
    );
  };

  return (
    <Wrapper>
      {!response ? (
        <Form>
          <Heading>Let's Plan</Heading>
          <InputContainer>
            <InputTitle>Location:</InputTitle>
            <InputField
              onChange={(event) => setLocation(event.target.value)}
              placeholder="where to go?"
            />
            <InputTitle>Budget:</InputTitle>
            <InputField
              onChange={(event) => setBudget(event.target.value)}
              placeholder="What's your budget?"
              type="number"
            />
            <InputTitle>Duration (in day):</InputTitle>
            <InputField
              onChange={(event) => setDay(event.target.value)}
              placeholder="How long will be your trip?"
              type="number"
            />
          </InputContainer>
          <Button onClick={plan}>Plan</Button>
        </Form>
      ) : (
        <IternaryWrapper>
          <IternaryHeading>{`${day} day trip iternary for ${location}:`}</IternaryHeading>
          <Container>{response && response.data.choices[0].text}</Container>
          <PlanAgainWrapper>
            <Button
              plan="planAgain"
              onClick={() => {
                setResponse("");
                setPlanning(false);
              }}>
              <ArrowBack style={{ paddingRight: "10px" }} /> Plan Again
            </Button>
          </PlanAgainWrapper>
        </IternaryWrapper>
      )}

      {planning && (
        <Heading>
          Please wait, while we are preparing your trip iternary...
        </Heading>
      )}
    </Wrapper>
  );
};

export default Plan;
