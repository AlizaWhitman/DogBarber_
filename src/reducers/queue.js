import { ACTION_TYPES } from "../actions/queue";

const initialState = {
    list: []

}

export const queue = (state = initialState, action) => {
    
    switch (action.type) {
        case ACTION_TYPES.GET_ALL:

            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            window.alert(action.payload.id)
            console.log("SHOW MW")
            return {
                ...state,
                list: state.list.map(x=>x.id == action.payload.id? action.payload: x)
            }
            
        case ACTION_TYPES.DELETE:
            console.log(action.payload)
            return {
                ...state,
                list: state.list.filter(x=>x.id!=action.payload)
            }
        default:
            return state
        }
}
