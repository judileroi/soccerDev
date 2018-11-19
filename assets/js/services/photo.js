import CONFIG_APP from "../config";
import axios from 'axios';

const apiUploadUrl = CONFIG_APP.endpoint.url + '/uploadHandler'
const apiUrl = CONFIG_APP.endpoint.url + '/api/photos'

class PhotoService {

    static uploadPhoto=photo=>{
        return axios.post(apiUploadUrl, photo)
    }

    static savePhoto = photo => {
          return axios.post(apiUrl, photo)
        };
      
}

export default PhotoService