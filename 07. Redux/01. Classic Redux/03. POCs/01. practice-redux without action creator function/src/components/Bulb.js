import styles from './Bulb.module.css'
import { useSelector, useDispatch } from 'react-redux'

const Bulb = () => {
    const bulbState = useSelector(state => state.bulbReducer)
    const dispatch = useDispatch()  
    const handleClick = (e) => {
        e.preventDefault()
        if(bulbState === 'off'){
            dispatch({type: 'BULB_OFF', payload: bulbState})
        }
        if(bulbState === 'on'){
            dispatch({type: 'BULB_ON', payload: bulbState})
        } 
    }

    return <>
        <div className={bulbState === 'off'? styles.off : styles.on}></div>
        <br/>
        <button onClick={handleClick}>On/Off</button>
    </>
}

export default Bulb