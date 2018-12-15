import CONFIG_APP from "../config";
import axios from 'axios';

const place_url = CONFIG_APP.placecomplete

class PlaceAutoCompleteService {

    static getAddress = (query,option) => {
          return axios.get(place_url+query+'?format=json&'+option)
        };
      
}

export default PlaceAutoCompleteService