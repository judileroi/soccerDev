
import TYPE from '../type'

export const photoReducer = (state = {}, action) => {

    switch (action.type) {
        case TYPE.photo.fetch_success:

            var newState = Object.assign(state, {}, { data: action.payload })
            return newState
            
        case TYPE.photo.active:
            var newState = Object.assign(state, {}, { active: action.payload })
            return newState

        case TYPE.photo.last_uri:
            var data = state.last_uri
            if (!data) data = []
            data.push(action.payload)
            var newState = Object.assign(state, {}, { last_uri: data })
            return newState

        default:
            return state
    }

}