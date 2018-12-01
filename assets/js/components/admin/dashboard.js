
import React from 'react'
import { Route, Link ,Switch} from 'react-router-dom'

import CategoryResource from '../category/categoryResource';
import BannerAdmin from '../shared/banner-admin'

const Dashboard = () => {
    return ( 
        <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </header>
    
        <Switch>
          <Route exact path="/" component={BannerAdmin} />
          <Route exact path="/about" component={CategoryResource} />
        </Switch>
      </div>
     );
}
 
export default Dashboard;