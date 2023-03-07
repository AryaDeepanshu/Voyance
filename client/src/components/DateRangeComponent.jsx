import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import styled from "styled-components";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

const Container = styled.div`
  border: 1px solid lightgray;
  height: max-content;
  width: max-content;
  z-index: 2000;
  position: absolute;
  left: 0px;
  top: 50px;
`;

const DateRangeComponent = ({ date, setDate, setDisplayDate }) => {
  // Date in Required format:
  // console.log(format(date[0].startDate, "dd/MM/yyyy"));
  // console.log(format(date[0].endDate, "dd/MM/yyyy"));

  const handleDate = (event) => {
    setDate([event.selection]);
    setDisplayDate({
      startDate: format(event.selection.startDate, "dd/MM/yyyy"),
      endDate: format(event.selection.endDate, "dd/MM/yyyy"),
    });
  };

  return (
    <Container>
      <DateRange
        editableDateInputs={true}
        onChange={handleDate}
        moveRangeOnFirstSelection={false}
        ranges={date}
        minDate={new Date()}
      />
    </Container>
  );
};

export default DateRangeComponent;
