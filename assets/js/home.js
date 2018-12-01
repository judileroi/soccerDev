import '../css/app.css';
import '../css/grid-list.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import Navigation from './components/shared/navigation';
import MainSearch from './components/shared/main-search';
import CategoryService from './services/categories';
import CategorySlider from './components/home/category-slider';
import store ,{history} from './store';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      categories:[]
    };
  }

 
 componentWillMount(){
  CategoryService.getAllCategory().then(res=>{

    this.setState({
      categories:res.data
    })
    
  }).catch(err=>{
    throw(err)
  })
 }

  render() {

    return (
      <Provider store={store}>
          <div>
            <Navigation></Navigation>
            <MainSearch></MainSearch>
            <CategorySlider categories={this.state.categories}/>
          </div>
      </Provider>

    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));

