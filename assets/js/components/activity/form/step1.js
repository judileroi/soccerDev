import React from 'react';
import TimePickerComponent from '../../shared/timePicker';
import DatePickerComponent from '../../shared/datePicker';

const FormActivityStep1 = (props) => {
    const {activity, changeDate,changeTime} = props
    return (
            <div>
                <DatePickerComponent 
                changeDate={(date,dateObjet)=>{changeDate(dateObjet)}} 
                value={activity.date}
                
                />
                <TimePickerComponent
                 onChange={(time,timeObject)=>{changeTime(timeObject)}} 
                 value={activity.time}
                 />
        </div>
    );
}


export default FormActivityStep1
