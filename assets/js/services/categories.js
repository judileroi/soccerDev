import axios from 'axios';
import CONFIG_APP from '../config';


const apiUrl = CONFIG_APP.endpoint.url +'/api/categories'

class CategoryService {
  
  static saveCategory = category => {
    return axios.post(apiUrl, category)
  }

  static updateCategory = category => {
    return axios.post(apiUrl+'/'+category.id, category)
  }
}

export default CategoryService