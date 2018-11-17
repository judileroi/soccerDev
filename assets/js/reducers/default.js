
import TYPE from '../type'

export const defaultReducer = (state = {}, action) => {

    switch (action.type) {

        case TYPE.default.begin_loading:
            var newState = Object.assign({}, state, { loading: true })
            return newState

        case TYPE.default.stop_loading:
            var newState = Object.assign({}, state, { loading: false })
            return newState

        default:
            return state
    }

}