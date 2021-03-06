import { combineReducers } from 'redux';
import { categoryReducer } from './reducers/category';
import { defaultReducer } from './reducers/default';
import { photoReducer } from './reducers/photo';
import { messageBoxReducer } from './reducers/messageBox';


export default combineReducers({
    category: categoryReducer,
    default:defaultReducer,
    photo:photoReducer,
    message:messageBoxReducer

  });