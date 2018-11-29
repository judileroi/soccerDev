import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CategoryResource from './components/category/categoryResource';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import Navigation from './components/shared/navigation';
import MainSearch from './components/shared/main-search';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      entries: []
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
          <div>
          <Navigation></Navigation>
            <MainSearch></MainSearch>
            <CategoryResource></CategoryResource>

          </div>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
