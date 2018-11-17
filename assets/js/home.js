import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import Header from './components/shared/header';
import MainSearch from './components/shared/main-search';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      entries: []
    };
  }

 

  render() {
    return (
      <Provider store={store}>
          <div>
            <Header></Header>
            <MainSearch></MainSearch>

          </div>
      </Provider>

    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));

