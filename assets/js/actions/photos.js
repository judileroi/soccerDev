import axios from 'axios';
import TYPE from '../type';
import CONFIG_APP from '../config';
import Notifications, { notify } from 'react-notify-toast';
const apiUrl = CONFIG_APP.endpoint.url + '/api/photos'
const apiUploadUrl = CONFIG_APP.endpoint.url + '/uploadHandler'

class Photo {

  /** Fetch All Photos */
  static fetch = () => {
    return (dispatch) => {
      return axios.get(apiUrl)
        .then(response => {

          dispatch(Photo.callbackSuccess(response.data))

        })
        .catch(error => {

          dispatch(Photo.callbackError(error))

        });
    };
  }

  /** Fetch One Photo */
  static fetchId = Id => {

  }

  /** Active Select */
  static active = photo => {
    return {
      type: TYPE.photo.active,
      payload:photo
    }
  }

  /** Add Photo To BD */
  static add = photo => {
    return (dispatch) => {
      return axios.post(apiUrl, photo)
        .then(response => {
            dispatch(Photo.callbackURISuccess('/api/photos/'+response.data.id))
        })
        .catch(error => {
          notify.show('Erreur pendant l\'enregistretrement !', "error", 5000);
  
          throw (error);
        });
    };
  }

  /**
   * Upload A Photo before and Add to BD
   */

  static uploadAndadd=photo=>{
    return (dispatch) => {
      return axios.post(apiUploadUrl, photo)
        .then(response => {
          if (response.status == 200)
            notify.show('Photo uploadé avec succès !', "success", 5000);
            //photo.path=response.path
            
            dispatch(Photo.add(photo))
        })
        .catch(error => {
          notify.show('Erreur pendant l\'enregistretrement !', "error", 5000);
  
          throw (error);
        });
    };
  }

  /** Remove Photo */
  static remove = photoId => {
    return (dispatch) => {
      return axios.delete(apiUrl + '/' + photoId)
        .then(response => {
          dispatch(Photo.fetch())
        })
        .catch(error => {
          dispatch(Photo.callbackError(error))
        });
    };
  }

  /** Update Photo */
  static update = (photo) => {
    // Not implement
  }

  /** Callback Success */
  static callbackSuccess = data => {
    return {
      type: TYPE.photo.fetch_success,
      payload: photo
    }
  }

  /** Callback Error */
  static callbackError = error => {
    return {
      type: TYPE.photo.fetch_error,
      payload: error
    }
  }

  /** Last Add URL Get */

  static callbackURISuccess = URI => {
    return {
      type: TYPE.photo.last_uri,
      payload: URI
    }
  }
}


export default Photo