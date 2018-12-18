import '../css/calendar.scss';
import '../css/react-md.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store, { history } from './store'
import UserApp from './container/userApp';

const customContext = React.createContext(null)

const AdminPlus = (props) => {
  return (
    <Provider store={store} context={customContext}>
      <UserApp/>
    </Provider >);
}


ReactDOM.render(<AdminPlus />, document.getElementById('root'));

