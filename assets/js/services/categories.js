import axios from 'axios';
import CONFIG_APP from '../config';


const apiUrl = CONFIG_APP.endpoint.url +'/api/categories'

class CategoryService {
  
  static saveCategory = category => {
    return axios.post(apiUrl, category)
  }

  static getCategory = (category) => {
    return axios.get(apiUrl+'/'+category.id)
  }

  static getAllCategory = () => {
    return axios.get(apiUrl)
  }

  static getCategoryAllPhotos = (category) => {
    return axios.get(apiUrl+'/'+category.id+'/photos')
  }

  static updateCategory = category => {
    return axios.put(apiUrl+'/'+category.id, category)
  }


}

export default CategoryService