import axios from 'axios';
import TYPE from '../type';
import CONFIG_APP from '../config';

const apiUrl = CONFIG_APP.endpoint.url +'/api/category'

export const beginLoading = () => {
    return {
      type: TYPE.default.begin_loading
    }
  };

  export const stopLoading = () => {
    return {
      type: TYPE.default.stop_loading
    }
  };
