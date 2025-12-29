const initialState = {
    name: "",
    email: "",
    address: "",
    latitude1: "",
    longitude1: "",
    latitude2: "",
    longitude2: "",
    payment: "",
    duration: 0,
    distance: 0,
    token: "",
    number: "",
    item: 0,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                name: action.payload
            }
        case "SET_EMAIL":
            return {
                ...state,
                email: action.payload
            }
        case "SET_ADDRESS":
            return {
                ...state,
                address: action.payload
            }
        case "SET_LATITUDE1":
            return {
                ...state,
                latitude1: action.payload
            }
        case "SET_LONGITUDE1":
            return {
                ...state,
                longitude1: action.payload
            }
        case "SET_LATITUDE2":
            return {
                ...state,
                latitude2: action.payload
            }
        case "SET_LONGITUDE2":
            return {
                ...state,
                longitude2: action.payload
            }
        case "SET_PAYMENT":
            return {
                ...state,
                payment: action.payload
            }
        case "SET_DURATION":
            return {
                ...state,
                duration: action.payload
            }
        case "SET_DISTANCE":
            return {
                ...state,
                distance: action.payload
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload
            }
        case "SET_NUMBER":
            return {
                ...state,
                number: action.payload
            }
        case "INCREMENT_ITEM":
            return {
                ...state,
                item: state.item + action.payload
            }
        case "DECREMENT_ITEM":
            return {
                ...state,
                item: state.item - action.payload
            }
        default:
            return state
    }
}
export default Reducer;