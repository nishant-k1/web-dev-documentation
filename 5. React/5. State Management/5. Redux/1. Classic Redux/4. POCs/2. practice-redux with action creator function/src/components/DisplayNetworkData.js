import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAsyncData} from '../state/displayNetworkDataSlice'

const DisplayNetworkData = () => {

    const json = useSelector(state => state.displayReducer)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAsyncData())
    }, [])
    
    console.log(json)
    return <>
        <h2>This is a test</h2>
        {json.map(element => <p>{element.title}</p>)}
    </>
}

export default DisplayNetworkData