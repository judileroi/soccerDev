import axios from 'axios';
import TYPE from '../type';
import CONFIG_APP from '../config';
import { beginLoading, stopLoading } from './default';
import Photo, { uploadAndadd } from './photos';
import Notifications, { notify } from 'react-notify-toast';

const apiUrl = CONFIG_APP.endpoint.url +'/api/categories'

export const fetchSuccess = (category) => {
    return {
      type: TYPE.category.fetch_success,
      payload:category
    }
  };

  export const fetchAllCategory = () => {
    
    return (dispatch) => {
        dispatch(beginLoading())
      return axios.get(apiUrl)
        .then(response => {
          
          dispatch(fetchSuccess(response.data))
          dispatch(stopLoading())
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const removeCategory = (id) => {
    return (dispatch) => {
        dispatch(beginLoading())
      return axios.delete(apiUrl+'/'+id)
        .then(response => {
          dispatch(fetchAllCategory())
          dispatch(stopLoading())
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const activeCategory =(select)=>{
    return{
      type:TYPE.category.active,
      select
    }
      
    
  }
  export  const addCategory = (category) => {
    
    return (dispatch) => {
        dispatch(beginLoading())
      return axios.post(apiUrl,category)
        .then(response => {

            if(response.status==200)     
            notify.show('Catégorie enregistré avec succès !',"success",5000);

        })
        .catch(error => {
          notify.show('Erreur pendant l\'enregistretrement !',"error",5000);

          throw(error);
        });
    };
  };

  export const updateCategory = (category) => {
    
    return (dispatch) => {
        dispatch(beginLoading())
      return axios.put(apiUrl+'/'+category.id,category)
        .then(response => {
            if(response.status==200)     
            notify.show('Catégorie mis à jour avec succès !',"success",5000);

        })
        .catch(error => {
          notify.show('Erreur pendant l\'enregistretrement !',"error",5000);

          throw(error);
        });
    };
  };