

"use client";
import React from "react";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import dayjs from "dayjs";


export default function TimePicker(props) {

 const [ selectedDate, setSelectedDate ] = useState(dayjs("2022-04-17T15:30"));

  const handleTime = (newValue) => {
    setSelectedDate(newValue)
    props.getVal(newValue.$d)
  }
  return (
    <>
      <DemoContainer
        components={[
          "TimePicker",
          "MobileTimePicker",
          "DesktopTimePicker",
          "StaticTimePicker",
        ]}>
        <DemoItem>
          <label
            className='mb-2 mr-44 text-medium font-space text-gray-900 dark:text-white'>
            {props.time}
          </label>
          <MobileTimePicker onChange={handleTime} value={selectedDate} defaultValue={dayjs("2022-04-17T15:30")} />
        </DemoItem>
      </DemoContainer>
    </>
  );
}
