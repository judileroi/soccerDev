import React from 'react';
import { push } from "react-router-redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const NavigationUser = (props) => {

    return (
        <div>
            <a onClick={props.navigateTo.bind(this, '/admin/activity')} className="button border with-icon" >Créer une activité <i className="sl sl-icon-plus"></i></a>
            <div className={!props.userActive ? 'hidden' : 'user-menu'}>

                <div className="user-name"><span><img src="images/dashboard-avatar.jpg" alt="" /></span>Tom Perrin</div>
                <ul>
                    <li><a href="dashboard.html"><i className="sl sl-icon-settings"></i> Dashboard</a></li>
                    <li><a href="dashboard-my-profile.html"><i className="sl sl-icon-user"></i> Profil</a></li>
                    <li><a href="dashboard-my-profile.html"><i className="sl sl-icon-user"></i> Historique</a></li>
                    <li><a href="dashboard-my-profile.html"><i className="sl sl-icon-user"></i> Notifications</a></li>
                    <li><a href="dashboard-my-profile.html"><i className="sl sl-icon-user"></i> Messages</a></li>
                    <li><a onClick={props.navigateTo.bind(this, '/admin/category')}><i className="sl sl-icon-user"></i> Categories</a></li>
                    <li><a onClick={props.navigateTo.bind(this, '/admin/date')}><i className="sl sl-icon-user"></i> Date</a></li>
                    <li><a href="dashboard-my-profile.html"><i className="sl sl-icon-user"></i> Activités</a></li>
                    <li><a href="dashboard-my-profile.html"><i className="sl sl-icon-user"></i> Page</a></li>
                    <li><a href="index.html"><i className="sl sl-icon-power"></i> Logout</a></li>
                </ul>
            </div>
        </div>
    );
}

NavigationUser.propTypes = {
    userActive: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationUser)

