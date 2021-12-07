import React, {useState, useEffect } from 'react';
import './Styles/App.css';
import Time from './Components/Time'
import Lap from './Components/Lap'
import MyButton from './Components/UI/Button/MyButton'
import Context from './context'

function App() {
	  //timer
	  const [time, setTime] = useState({hour: 0, minute: 0, seconds: 0, milliseconds: 0})
	  const [isTimer, setIsTimer] = useState(false)
	  const [lap, setLap] = useState({lap: [], lapCount: 0, lapBest: [], lapBestCount: 0, animation: false}) 
	  const [isBest, setBest] = useState(false)
	  
	  //btn name
	  const [btnSort, setBtnSort] = useState("Sort\ud83d\udc46")
	  
	  // colors
	  const [palleteID, setPalleteID] = useState(1)
	  
	  const defaultPalleteBtn = ["btnBlue", "btnYellow", "btnPink"]
	  const [palleteBtn, setPalleteBtn] = useState([defaultPalleteBtn[0]])
	  const defaultPalleteWrp = ["wrpBlue", "wrpYellow", "wrpPink"]
	  const [palleteWrp, setPalleteWrp] = useState([defaultPalleteWrp[0]])
	  const defaultPalleteTxt = ["txtYellow", "txtPink", "txtYellow"]
	  const [palleteTxt, setPalleteTxt] = useState([defaultPalleteTxt[0]])
	  
	  //styles for style css
	  const styles = {
		  buttons: {
			  display: 'flex',
			  justifyContent: 'center',
			  flexWrap: 'wrap'
		  },
		  btnLaps: {
			width: '100px',
			height: '100px'
		  },
		  btnPallete: {
			width: '200px',
			height: '100px'
		  }
	  }
	  
	  // dynamic classes
	  const classes = []
	  
	  if(isBest)
		  classes.push('clicked')
	  
	  
	useEffect(() => {
		let interval = null
		if(isTimer) 
			interval = setInterval(start, 10)
		else 
			clearInterval(interval)
		return () => clearInterval(interval)
	})
		  
	  function timerStart() {
		setIsTimer(!isTimer)
	  }
	  
	  function timerStop() {
		  setIsTimer(false)
		  setTime({hour: 0, minute: 0, seconds: 0, milliseconds: 0})
		  setLap({lap: [], lapCount: 0, lapBest: [], lapBestCount: 0, animation: false}) 
	  }
	  
	  function start() {
		if(time.hour >= 24) 
			timerStop()
		else if(time.minute >= 60) 
			setTime({hour: time.hour+1, minute: 0, seconds: time.seconds, milliseconds: time.milliseconds})
		else if(time.seconds >= 60)
			setTime({hour: time.hour, minute: time.minute+1, seconds: 0, milliseconds: time.milliseconds})
		else if(time.milliseconds < 99) 
			setTime({hour: time.hour, minute: time.minute, seconds: time.seconds, milliseconds: time.milliseconds+1})
		else 
			setTime({hour: time.hour, minute: time.minute, seconds: time.seconds+1, milliseconds: 0})
	  }
	  
	  function timerLap() {
		  if(!isTimer) return
		  const newLap = {
			  id: lap.lapCount,
			  text: `H: ${time.hour} M: ${time.minute} S: ${time.seconds} MS: ${time.milliseconds}`
		  }
		  if(lap.lap.length > 6 && btnSort === "Sort\ud83d\udc46")
			  lap.lap.shift()
		  else if(lap.lap.length > 6 && btnSort === "Sort\ud83d\udc47")
			  lap.lap.pop()
		  if(btnSort === "Sort\ud83d\udc46")
			  setLap({lap: [...lap.lap, newLap], lapCount: lap.lapCount+1, lapBest: lap.lapBest, lapBestCount: lap.lapBestCount, animation: false})
		  else
			  setLap({lap: [newLap, ...lap.lap], lapCount: lap.lapCount+1, lapBest: lap.lapBest, lapBestCount: lap.lapBestCount, animation: false})
		  setTime({hour: 0, minute: 0, seconds: 0, milliseconds: 0})
	  }
	  
	  function lapReverse()
	  {
		let newLap
		if(isBest) {
			if(btnSort === "Sort\ud83d\udc46")
			{
				setBtnSort("Sort\ud83d\udc47")
				newLap = lap.lapBest.sort((a, b) => { return a.id - b.id })
			}
			else
			{
				setBtnSort("Sort\ud83d\udc46")
				newLap = lap.lapBest.sort((a, b) => { return b.id - a.id })
			}
			setLap({lap: lap.lap, lapCount: lap.lapCount, lapBest: newLap, lapBestCount: lap.lapBestCount, animation: false})
		}
		else {
			if(btnSort === "Sort\ud83d\udc46")
			{
				setBtnSort("Sort\ud83d\udc47")
				newLap = lap.lap.sort((a, b) => { return b.id - a.id })
			}
			else
			{
				setBtnSort("Sort\ud83d\udc46")
				newLap = lap.lap.sort((a, b) => { return a.id - b.id })
			}
			setLap({lap: newLap, lapCount: lap.lapCount, lapBest: lap.lapBest, lapBestCount: lap.lapBestCount, animation: false})
		}
	  }
	  
	  function lapRemove(id) {
		  if(isBest) setLap({lap: lap.lap, lapCount: lap.lapCount, lapBest: lap.lapBest.filter(e => e.id !== id), lapBestCount: lap.lapBestCount, animation: false})
		  else setLap({lap: lap.lap.filter(e => e.id !== id), lapCount: lap.lapCount, lapBest: lap.lapBest, lapBestCount: lap.lapBestCount, animation: false})
	  }
	  
	  function lapBestAdd(e) {
		  setLap({lap: lap.lap, lapCount: lap.lapCount, lapBest: [...lap.lapBest, e], lapBestCount: lap.lapBestCount+1, animation: true})
	  }
	  
	  function lapBestShow(e) {
		setBest(!isBest)
		if(!isBest) {
			let newLap
			if(btnSort === "Sort\ud83d\udc46")
				newLap = lap.lapBest.sort((a, b) => { return b.id - a.id })
			else
				newLap = lap.lapBest.sort((a, b) => { return a.id - b.id })
			setLap({lap: lap.lap, lapCount: lap.lapCount, lapBest: newLap, lapBestCount: lap.lapBestCount, animation: false})
		}
	  }
	  
	  function changePallete() {
		  setPalleteBtn([defaultPalleteBtn[palleteID]])
		  setPalleteWrp([defaultPalleteWrp[palleteID]])
		  setPalleteTxt([defaultPalleteTxt[palleteID]])
		  
		  if(palleteID <= palleteBtn.length)
			  setPalleteID(palleteID+1)
		  else
			  setPalleteID(0)
	  }
	  
	  return (
		<Context.Provider value={{lapRemove: lapRemove, lapBestAdd: lapBestAdd, palleteTxt: palleteTxt}}>
			<div>
				<div className={`timer ${palleteTxt.join(' ')}`}>
					<Time value={time.hour} title={"Hour"}/>
					<Time value={time.minute} title={"Minute"}/>
					<Time value={time.seconds} title={"Seconds"}/>
					<Time value={time.milliseconds} title={"Milliseconds"}/>
				</div>
				<div className="buttons">
					<MyButton className={palleteBtn.join(' ')} onClick={timerStart}>{isTimer ? "Pause" : "Start"}</MyButton>
					<MyButton className={palleteBtn.join(' ')} onClick={timerStop}>{"Stop"}</MyButton>
					<MyButton className={palleteBtn.join(' ')} onClick={timerLap}>{"Lap"}</MyButton>
				</div>
				<div className={`lap_result ${palleteWrp.join(' ')}`} style={lap.lap.length > 0 ? {visibility: 'visible'} : {visibility: 'hidden'}} >
					<div className={`lap_result-title ${palleteTxt.join(' ')}`}>Laps</div>
					<div style={styles.buttons}>
						<MyButton className={palleteBtn.join(' ')} style={styles.btnLaps} onClick={lapReverse} >{btnSort}</MyButton>
						<MyButton className={`${classes.join(' ')} ${palleteBtn.join(' ')}`} onClick={lapBestShow} style={styles.btnLaps}>{"Best\ud83d\udc99"}</MyButton>
						<MyButton className={palleteBtn.join(' ')} style={styles.btnPallete} onClick={changePallete}>Pallete</MyButton>
					</div>
					<div className={`lap_result-footer ${palleteWrp.join(' ')}`}>
						{
							isBest ?  
								lap.lapBest.length > 0 ?
									lap.lapBest
									.filter((e, i) => lap.lapBest.indexOf(e) === i)
									.map((e, index) => <Lap e={e} key={index}/>) 
								:
									<p className={palleteTxt.join(' ')}>No results</p>
							: 
								lap.lap.length > 0 ?
									lap.lap
									.map((e, index) => <Lap e={e} key={index}/>)
									.reverse()
								:
									<p className={palleteTxt.join(' ')}>No results</p>
							
						} 
					</div>
				</div>
			</div>
		</Context.Provider>
	  )
}
export default App
