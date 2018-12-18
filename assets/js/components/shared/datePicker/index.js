import React from 'react';
import { DatePicker } from 'react-md';

const DatePickerComponent = (props) => (
  <div className="md-grid">

    <DatePicker
      id="appointment-date-landscape"
      placeholder="Date d'organisation"
      className="md-cell"
      displayMode="landscape"
      minDate={new Date()}
      onChange={props.changeDate}
      defaultValue={props.value}
    />
  </div>
);
export default DatePickerComponent;
