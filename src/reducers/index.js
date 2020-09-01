import {combineReducers} from 'redux';
import {queue} from "./queue";
import {clients} from "./clients"

export const reducers = combineReducers({
    queue,
})