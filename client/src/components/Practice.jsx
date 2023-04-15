import React from "react";
import styled from "styled-components";
import Search from "../components/Search";
import DaySchedule from "./DaySchedule";

import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import HotelCardLoader from "./Loaders/HotelCardLoader";
import SearchHotelListLoader from "./Loaders/SearchHotelListLoader";

const Container = styled.div`
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  padding: 20px;
  white-space: pre-wrap;
`;

const Practice = () => {
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const fetchData = async (input) => {
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/completions",
  //       {
  //         prompt: `${input}`,
  //         model: "text-davinci-003",
  //         max_tokens: 2048,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer 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`,
  //         },
  //       }
  //     );

  //     setResponse(response);
  //   };

  //   fetchData(
  //     "Plan a 6 day trip iternary to Dharamshala, provide the result in the following format" +
  //       "Day number, popular attractions, plan for morning, afternoon, evening"
  //   );
  // }, []);

  // console.log(response.data);

  // return (
  //   <>
  //     {response ? (
  //       <Container>{response && response.data.choices[0].text}</Container>
  //     ) : (
  //       <Container>Loading</Container>
  //     )}
  //   </>
  // );

  return <SearchHotelListLoader />;
};

export default Practice;

/*
  useEffect(() => {
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

      setResponse(response);
    };

    fetchData(
      "Plan a 4 day detailed trip to agra, provide the major attractions and dining options, also provide us an overall estimated cost."
    );
  }, []);
*/
