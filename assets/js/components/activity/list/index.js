
import React from 'react';
import ActivityItemCard from '../item';

const ActivityListCard = (props) => {
    const { activities } = props
    return (
        <div className="row">
            {
                activities.map(a => {
                    return (
                        <div className="col-lg-6 col-md-12" key={a.id}>
                            <ActivityItemCard  activity={a} />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ActivityListCard;