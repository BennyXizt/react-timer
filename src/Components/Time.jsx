import React from 'react';

function Time(props) {
	
	  
	  return (
		<div className="timer_block">
			<div className="time">{props.value}</div>
			<div className="title">{props.title}</div>
		</div>
		
	  )
}
export default Time
