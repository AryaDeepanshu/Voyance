import * as React from "react";
import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TextField } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DatePickerMobileComponent = ({ date, setDate, width }) => {
  return (
    <Wrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
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

export default DatePickerMobileComponent;
