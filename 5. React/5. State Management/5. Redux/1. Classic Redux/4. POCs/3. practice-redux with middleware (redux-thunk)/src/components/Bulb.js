import styles from './Bulb.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { switch_on, switch_off} from '../state/bulbSlice'

const Bulb = () => {
    // const bulbState = useSelector(state => state.bulbReducer)
    const state = useSelector(state => state)
    const bulbState = state.bulbReducer
    
    const dispatch = useDispatch()  
    const handleClick = (e) => {
        e.preventDefault()
        if(bulbState === 'off'){
            dispatch(switch_on())
        }
        if(bulbState === 'on'){
            dispatch(switch_off())
        } 
    }

    return <>
        <div className={bulbState === 'off'? styles.off : styles.on}></div>
        <br/>
        <button onClick={handleClick}>On/Off</button>
    </>
}

export default Bulb