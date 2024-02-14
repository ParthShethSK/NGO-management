"use client";
import React, { useState } from "react";
import dayjs from 'dayjs';

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function Datepicker(props) {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const finalDateValue = (newValue) => {
    setValue(newValue)
    props.date(newValue.$d)
  }

  return (
    <>
      <div className='mt-4 text-base font-space text-gray-900'>
        {props.time}
      </div>
      <DemoContainer components={["DatePicker"]}>
        {props.disabled === "disabled" ? (
          <DatePicker value={value} onChange={finalDateValue} disabled />
        ) : (
          <DatePicker value={value} onChange={finalDateValue}
          />
        )}
      </DemoContainer>
    </>
  );
}
