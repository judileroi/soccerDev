import React, { Component } from 'react';
import PhotoService from '../../../services/photo';

class ActivityItemCard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            photo:''
         }
    }

    componentDidMount() {
        if(this.props.activity.photos.length > 0){
            var p = this.props.activity.photos[0]
             var n = p.split('/')
             
             PhotoService.getPhoto(n[3]).then(res=>{
                 console.log(res.data);
                 this.setState({
                     photo:res.data.path
                 })
             })
            
        }
    }

    render() { 
        const { activity } = this.props
        const { photo } = this.state

        return (
            <a href="#" className="listing-item-container">
            <div className="listing-item">
                <img src={photo ? '../uploads/' + photo:''} alt="" />
                <div className="listing-item-details">
                    <ul>
                        <li>{activity.date}, {activity.time}</li>
                    </ul>
                </div>
                <div className="listing-item-content">
                    <span className="tag">Events</span>
                    <h3>{activity.titre}</h3>
                    <span>{activity.description}</span>
                </div>
                <span className="like-icon"></span>
            </div>
            <div className="star-rating" data-rating="5.0">
                <div className="rating-counter">(23 reviews)</div>
                <span className="star"></span><span className="star"></span><span className="star"></span><span className="star"></span><span className="star"></span></div>
        </a>
          );
    }
}
 
export default ActivityItemCard;