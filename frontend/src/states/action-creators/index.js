 const updateName = (name) => {
    return (dispatch) => {
        dispatch({
            type: "SET_NAME",
            payload: name
        })
    }
}

const updateNumber = (number) => {
    return (dispatch) => {
        dispatch({
            type: "SET_NUMBER",
            payload: number
        })
    }
}

const updateEmail = (email) => {
    return (dispatch) => {
        dispatch({
            type: "SET_EMAIL",
            payload: email
        })
    }
}

const updateAddress = (address) => {
    return (dispatch) => {
        dispatch({
            type: "SET_ADDRESS",
            payload: address
        })
    }
}

const updateLatitude1 = (latitude1) => {
    return (dispatch) => {
        dispatch({
            type: "SET_LATITUDE1",
            payload: latitude1
        })
    }
}
const updateLongitude1 = (longitude1) => {
    return (dispatch) => {
        dispatch({
            type: "SET_LONGITUDE1",
            payload: longitude1
        })
    }
}
const updateLatitude2 = (latitude2) => {
    return (dispatch) => {
        dispatch({
            type: "SET_LATITUDE2",
            payload: latitude2
        })
    }
}

const updateLongitude2 = (longitude2) => {
    return (dispatch) => {
        dispatch({
            type: "SET_LONGITUDE2",
            payload: longitude2
        })
    }
}

const updatePayment = (payment) => {
    return (dispatch) => {
        dispatch({
            type: "SET_PAYMENT",
            payload: payment
        })
    }
}

const updateDuration = (duration) => {
    return (dispatch) => {
        dispatch({
            type: "SET_DURATION",
            payload: duration
        })
    }
}

const updateDistance = (distance) => {
    return (dispatch) => {
        dispatch({
            type: "SET_DISTANCE",
            payload: distance
        })
    }
}

const updateToken = (token) => {
    return (dispatch) => {
        dispatch({
            type: "SET_TOKEN",
            payload: token
        })
    }
}

const incrementItems = (items) => {
    return (dispatch) => {
        dispatch({
            type: "INCREMENT_ITEM",
            payload: items
        })
    }
}

const decrementItems = (items) => {
    return (dispatch) => {
        dispatch({
            type: "DECREMENT_ITEM",
            payload: items
        })
    }
}

export { updateName, updateNumber, updateEmail, updateAddress, updateLatitude1, updateLongitude1, updateLatitude2, updateLongitude2, updatePayment, updateDistance, updateDuration, updateToken, incrementItems, decrementItems };
