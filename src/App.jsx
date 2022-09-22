import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const vid = 'assets/videoplayback.mp4'

function App() {
  
  
  const [timerText, setTimerText] = useState("")
  
  function playAlarmSound() {
    let vid = document.getElementById('video')

    vid.addEventListener('ended', () => {
      vid.pause()
      vid.currentTime = 0
    })

    vid.play()
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
    <div>
    <form onSubmit={handleSubmit}>
      <input className='time'
        type = "text"
        onChange={handleChange}
        />
    </form>
    </div>
  )
}


export default App
