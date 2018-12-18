
import TYPE from '../type'

export const messageBoxReducer = (state = {}, action) => {

    switch (action.type) {

            case TYPE.message.event:
            var newState = Object.assign({}, state, { entity: action.payload.entity,message:action.payload.message,type:action.payload.type,stop:action.payload.stop })
            return newState

        default:
            return state
    }

}