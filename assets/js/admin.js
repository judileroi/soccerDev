import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';


/** Router Module Redux  */
import { connectRouter,ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { Route, Link } from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'
// import Navigation from './components/shared/navigation';

import CategoryResource from './components/category/categoryResource';
import BannerAdmin from './components/shared/banner-admin'

const history = createHistory()
const middleWare = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(connectRouter(history)(reducers), composeEnhancers(applyMiddleware(middleWare, thunk)));

const AdminPlus = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <Navigation context={this.context} /> */}
        <ConnectedRouter history={history}>
            <Route exact path="/" component={BannerAdmin} />
            <Route exact path="/category" component={CategoryResource} />
        </ConnectedRouter>
      </div>
    </Provider>);
}


ReactDOM.render(<AdminPlus />, document.getElementById('root'));

