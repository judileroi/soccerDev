import '../css/app.css';
import '../css/calendar.scss';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'connected-react-router'
import BannerAdmin from './components/admin/banner'
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

