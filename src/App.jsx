import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { render } from 'react-dom'

const vid = 'assets/videoplayback.mp4'

function App() {
  
  const [timerText, setTimerText] = useState("")
  const [timers, setTimers] = useState([])
  
  function playAlarmSound() {
    let vid = document.getElementById('video')

    vid.addEventListener('ended', () => {
      vid.pause()
      vid.currentTime = 0
    })

    vid.play()
  }

  useEffect(() => {
    let interval = setInterval(() => {
      
      let newTimers = []

      for(let i = 0; i < timers.length; i++) {
        newTimers.push(timers[i] - 1)
      }

      setTimers(newTimers);

    }, 1000)

    return () => clearInterval(interval)
  }, [timers])

  function addTimer(time) {
    setTimers(prev => [
      time,
      ...prev
    ])
  }
  
  function handleChange(event) {
    setTimerText(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    let time = 0

    function calculateTime() {
      let parsed = timerText.split(':')
      let multiplier = 1

      for(let i = parsed.length - 1; i >= 0; i--){
        time += parseInt(parsed[i]) * (60**(parsed.length - i - 1))
      }

      return time * 1000
    }

    setTimeout(playAlarmSound, calculateTime())

    addTimer([time])
  }

  const renderTimers = timers.map(timer => (
    <div className='timer'>{ timer }</div>
  ))
  
  return(
    <div className='container'>
    <form onSubmit={handleSubmit}>
      <input className='time'
        type = "text"
        onChange={handleChange}
        />
      <input className='submit'
        type='submit'
        />
    </form>
    {renderTimers} 
    </div>
  )
}


export default App
