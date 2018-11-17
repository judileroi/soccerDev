
import TYPE from '../type'

export const categoryReducer = (state = {} , action) => {

    switch (action.type) {
        case TYPE.category.fetch_success:
        
            var newState = Object.assign(state,{}, {data:action.payload})
            return newState
        case TYPE.category.active:
            var newState = Object.assign(state,{},{active:action.select})
        default:
            return state
    }
    
}