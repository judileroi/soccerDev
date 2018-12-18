import React from 'react';
import { render } from 'react-dom';
import { Route,Switch } from 'react-router-dom'
import CategoryResource from '../components/category/categoryResource';
import SideBarAdmin from '../components/admin/sidebar';
import ActivityForm from '../components/activity/activityForm';
import ListActivityForUser from '../container/listActivityForUser';


const RouterAdmin = (props) => {
    return (
        <div className="row">
            <div className="col-lg-9 col-md-8 padding-right-10">
                <Switch>
                <Route exact path="/admin" render={() => (<h1>Coool</h1>)} />
                <Route  path="/admin/category" component={CategoryResource} />
                <Route  path="/admin/activity" component={ActivityForm} />
                <Route  path="/admin/list-activity" component={ListActivityForUser} />
                </Switch>
            </div>

            <div className="col-lg-3 col-md-4 margin-top-0 margin-bottom-60">
            <SideBarAdmin/>
            </div>
        </div>
    );
}

export default RouterAdmin;