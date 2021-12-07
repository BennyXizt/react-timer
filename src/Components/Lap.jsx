import React, { useContext } from 'react'
import Context from '../context'

function Lap(props) {
	const styles = {
		button: {
			marginLeft: '1rem'
		}
	}
	const {lapRemove, lapBestAdd, palleteTxt} = useContext(Context)
	  
	return (
		<div>
			<div className={palleteTxt}>{`Lap ${props.e.id}: ${props.e.text}`}</div>
			<button style={styles.button} onClick={() => lapRemove(props.e.id)}>&#10060;</button>
			<button style={styles.button} onClick={() => lapBestAdd(props.e)}>&#128153;</button>
		</div>
	)
}	
	
export default Lap