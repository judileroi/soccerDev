import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CategoryResource from './Components/category/resource';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import Header from './components/shared/header';
import MainSearch from './components/shared/main-search';
import ItemCard from './Components/ItemCard';
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
          <Header></Header>
            <MainSearch></MainSearch>
            <CategoryResource></CategoryResource>

          </div>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
