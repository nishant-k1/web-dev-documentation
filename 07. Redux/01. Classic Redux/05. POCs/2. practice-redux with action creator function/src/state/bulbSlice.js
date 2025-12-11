
// In Redux, a reducer is a pure function that takes an action and the previous state of the application and returns the new state.

// bulb reducer 
export const bulbReducer = (state = 'off', {type, payload }) => {
    switch (type){
        case 'BULB_OFF':
            return 'on'// returns a new state
        case 'BULB_ON':
            return 'off' // returns a new state
        default:
            return state
    }
}


// bulb action-creator function 
    
export const switch_on = () => {
    return dispatch => dispatch({
        type:'BULB_OFF',
        payload: 'off'
    })
}

export const switch_off = () => {
    return dispatch => dispatch({
        type:'BULB_ON',
        payload: 'on'
    })
}