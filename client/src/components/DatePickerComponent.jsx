import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DatePickerComponent = ({ date, setDate, width }) => {
  return (
    <Wrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(startProps) => (
            <>
              <TextField
                {...startProps}
                style={{
                  width: width,
                  zIndex: 999999,
                  paddingTop: 0,
                  backgroundColor: "white",
                }}
              />
            </>
          )}
        />
      </LocalizationProvider>
    </Wrapper>
  );
};

export default DatePickerComponent;
