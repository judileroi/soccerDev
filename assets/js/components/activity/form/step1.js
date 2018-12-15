import React from 'react';
import DateRangePickerWrapper from '../../../plugins/datePickerRange';

const FormActivityStep1 = (props) => {
    const {activity, changeDate} = props
    return (

                <DateRangePickerWrapper 
                startDate = {activity.startDate}
                endDate = {activity.endDate}
                changeDate ={changeDate}
                />
    );
}

export default FormActivityStep1;