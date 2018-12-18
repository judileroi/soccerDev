import React from 'react';
import { TimePicker } from 'react-md';

const TimePickerComponent = (props) => (
    
    <div className="md-grid">
      <TimePicker
        id="appointment-time-auto"
        placeholder="Heure d'organisation"
        className="md-cell"
        displayMode="landscape"
        onChange={props.onChange}
        defaultValue={props.value}

      />
    </div>
  );
  export default TimePickerComponent;