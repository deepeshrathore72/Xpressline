import { legacy_createStore as createStore } from 'redux'
// import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import Reducer from './reducers/reducer1';

const rootReducer= combineReducers({
    reducer:Reducer
})
const initialState={
    reducer:{
        name: "",
        email: "",
        address: "",
        latitude1: "",
        longitude1: "",
        latitude2: "",
        longitude2: "",
        payment: "",
        duration:0,
        distance:0,
        token:"",
        number:"",
        item:0,
    }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default store;