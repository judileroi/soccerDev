import React, { PureComponent } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment'

class DatePickerRange extends PureComponent {
    state = {
        startDate: moment().subtract(5, 'day'),
        endDate: moment().add(3, 'day') ,
        focusedInput: null
    }
    render() {
        return (
            <DateRangePicker
                id="date_input"
                startDateId="start"
                endDateId="end"
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                focusedInput={this.state.focusedInput}
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
                onFocusChange={({ focusedInput }) => { this.setState({ focusedInput }); }}
            />
        );
    }
}


export default DatePickerRange;