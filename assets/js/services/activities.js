import axios from 'axios';
import CONFIG_APP from '../config';


const apiUrl = CONFIG_APP.endpoint.url +'/api/activities'

class ActivityService {
  
  static saveActivity = activity => {
    return axios.post(apiUrl, activity)
  }

  static getActivity = (activity) => {
    return axios.get(apiUrl+'/'+activity.id)
  }

  static getAllActivity = () => {
    return axios.get(apiUrl)
  }

  static getActivityAllPhotos = (activity) => {
    return axios.get(apiUrl+'/'+activity.id+'/photos')
  }

  static updateActivity = activity => {
    return axios.put(apiUrl+'/'+activity.id, activity)
  }


}

export default ActivityService