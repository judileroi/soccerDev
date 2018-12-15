import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import moment from 'moment'

class DateRangePickerWrapper extends Component {

    constructor(props){
        super(props)
        this.state= {
            selectionRange :{
                startDate: props.startDate,
                endDate: props.endDate ,
                key: 'selection'
            }
        }
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectionRange:Object.assign({},this.state.selectionRange,{startDate:nextProps.startDate,endDate:nextProps.endDate})
        })
    }

	handleSelect =(ranges)=>{
        this.props.changeDate(ranges)

	}
	render(){
        const {selectionRange} = this.state

		return (
			<DateRange
				ranges={[selectionRange]}
                onChange={this.handleSelect}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                
			/>
		)
	}
}




export default DateRangePickerWrapper;