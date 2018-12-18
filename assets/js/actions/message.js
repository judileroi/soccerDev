import TYPE from '../type';

  /** I used this function to Toast message after an event
   * entite -> Entity Event
   * display -> what message i want to display 
   * type -> type of Toast (delete,add,edit)
   */
  export const messageEvent = (entity,message,type,stop) => {
    return {
      type: TYPE.message.event,
      payload:{
        entity:entity,
        message:message,
        type:type,
        stop:stop
      }
    }
  };