import CONFIG_APP from "../config";
import axios from 'axios';

const apiUploadUrl = CONFIG_APP.endpoint.url + '/uploadHandler'
const apiUrl = CONFIG_APP.endpoint.url + '/api/photos'
const apiUrlBase = CONFIG_APP.endpoint.url

class PhotoService {

    static uploadPhoto=photo=>{
        return  axios.post(apiUploadUrl, photo)
    }

    static getPhoto=(photoId)=>{
        return axios.get(apiUrlBase+ photoId)
    }
    static savePhoto = photo => {
          return axios.post(apiUrl, photo)
        };
      
}

export default PhotoService