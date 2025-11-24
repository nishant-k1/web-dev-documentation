export const displayReducer = (state=[], {type, payload}) => {
    switch(type){
        case 'FETCH':
            return payload
        default:
            return state
    }
}

// the action creator function can't be asynchronous.
// export const fetchAsyncData = () =>  {
//     const promise = fetch('https://jsonplaceholder.typicode.com/todos/1')
//     return ({
//         type:'FETCH',
//         payload: promise
//     })
// }


export const fetchAsyncData = () =>  {
    return async (dispatch, getState) => {

        // the action creator function can't be asynchronous.
        // If we're using redux thunk as a middleware then action creator function can return a function instead of just an action object.
        // This function( being returned by the action creator due to thunk) can be made asynchronous.
        // This function( being returned by the action creator due to thunk) receives dispatch function as a value in its first parameter.
        // We can call the dispatch passing the action object as an argument.

        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        const json = await res.json()
        dispatch({
            type: 'FETCH',
            payload: json
        })
    }
}
