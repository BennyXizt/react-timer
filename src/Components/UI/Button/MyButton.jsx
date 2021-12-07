import React from 'react'
import classes from './MyButton.module.css'

function MyButton(props) {
	let classNames
	if(props.className !== undefined)
		classNames = `${classes.btn} ${props.className}`
	else
		classNames = classes.btn
	return (
		<button {...props} className={classNames}>
			{props.children}
		</button>
	)
}

export default MyButton