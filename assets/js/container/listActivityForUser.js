import React, { Component } from 'react'
import ActivityListCard from '../components/activity/list';
import ActivityService from '../services/activities';

class ListActivityForUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activities:[]
         }
    }

    componentDidMount() {
        ActivityService.getAllActivity().then(res=>{
            this.setState({
                activities : res.data
            })
        }).catch(error=>{

        })
    }

    render() { 
        const {activities} = this.state
        return ( 
            <ActivityListCard activities={activities}/>
         );
    }

}
 
export default ListActivityForUser;