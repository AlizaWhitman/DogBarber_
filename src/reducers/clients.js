import { ACTION_TYPES } from "../actions/client";

const initialState = {
    client: []
}
export const clients = (state = initialState, action) => {
    
    switch (action.type) {
        case ACTION_TYPES.GET:
            return {
                ...state,
                client: [...state.list, action.payload]  
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                client: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x=>x.id == action.payload.id? action.payload: x)
            }
            
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x=>x.id!=action.payload)
            }
        default:
            return state
    }
}