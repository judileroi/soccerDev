import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import store, { history } from './store'
import { ConnectedRouter } from 'connected-react-router'

import BannerAdmin from './components/admin/banner'
import SideBarAdmin from './components/admin/sidebar'
import Navigation from './components/shared/navigation'
import RouterAdmin from './routing/admin'


const AdminPlus = (props) => {
  return (
    <Provider store={store}>
      <div>
        <header>
          <Navigation context={this.context} userActive={true} />
        </header>
        <ConnectedRouter history={history}>
        <div>
          <BannerAdmin />
          <div className="container">
          <RouterAdmin />
          </div>
        </div>
        </ConnectedRouter>
      </div>
    </Provider >);
}


ReactDOM.render(<AdminPlus />, document.getElementById('root'));

