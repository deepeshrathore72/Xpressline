import {combineReducers} from 'redux';
import Reducer from './reducer1';

const rootReducer= combineReducers({
    reducer:Reducer
})
export default rootReducer;