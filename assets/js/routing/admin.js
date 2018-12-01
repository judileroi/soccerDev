import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom'
import CategoryResource from '../components/category/categoryResource';
import SideBarAdmin from '../components/admin/sidebar';


const RouterAdmin = (props) => {
    return (
        <div className="row">
            <div className="col-lg-9 col-md-8 padding-right-10">
                <Route exact path="/admin" render={() => (<h1>Coool</h1>)} />
                <Route exact path="/admin/category" component={CategoryResource} />
            </div>

            <div className="col-lg-3 col-md-4 margin-top-0 margin-bottom-60">
            <SideBarAdmin/>
            </div>
        </div>
    );
}

export default RouterAdmin;