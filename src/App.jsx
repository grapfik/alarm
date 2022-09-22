import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  
  const alarm = new Audio('../public/alarm.mp3')
  
  const [timerText, setTimerText] = useState("")

  function playAlarmSound() {
    alarm.play()
  }
  
  function handleChange(event) {
    console.log(event.target.value)
    setTimerText(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    console.log('submit')

    function calculateTime() {
      let time = 0
      let parsed = timerText.split(':')
      let multiplier = 1

      for(let i = parsed.length - 1; i >= 0; i--){
        time += parseInt(parsed[i]) * (60**(parsed.length - i - 1))
        
        console.log(time)
      }

      console.log(time)

      return time * 1000
    }

    setTimeout(playAlarmSound, calculateTime())
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <input
        type = "text"
        placeholder="time"
        onChange={handleChange}
        />
    </form>
  )
}


export default App