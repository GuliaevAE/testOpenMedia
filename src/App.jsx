import { useState, useRef, useEffect } from 'react'

import './assets/main.css'

import Player from './components/player'
import Input from './components/input'

function App() {
  const [switcher, setSwitch] = useState(false)
  const [playerSrc, setSrc] = useState('')

  const [errorVision, setVision] = useState(false)
  const [errorMeesage, setMeesage] = useState('asd')
  const error = useRef(null)

  useEffect(() => {
    if (!errorVision) {
      error.current.animate([

        { top: '-50%' },

      ], {
        duration: 1000, fill: 'forwards', easing: 'ease'
      })
    } else {
      error.current.animate([

        { top: '25px' }
      ], {
        duration: 1000, fill: 'forwards', easing: 'ease'
      })
    }
  }, [errorVision])


  function openError(message) {
    message?setMeesage(message):setMeesage('Unknown error')
    setVision(true)
  }

  function closeError() {
    setVision(false)
  }


  function changeSwitcher(bool, src, historyList) {
    setSwitch(bool)
    if (src) setSrc(src)
    if(historyList && historyList.indexOf(src)===-1){
      localStorage.setItem('historyList', JSON.stringify([src, ...historyList]))
    }
  }




  return (
    <>
      {!switcher && <Input changeSwitcher={changeSwitcher} openError={openError} closeError={closeError} />}
      {switcher && <Player changeSwitcher={changeSwitcher} openError={openError} playerSrc={playerSrc} />}

      <div ref={error} className="container_header_player_turntable_error">
        <img src="./images/error_icon.svg" alt="error" />
        <div className="container_header_player_turntable_error_content">
          <strong>Warning</strong>
          <span id="errorText">{errorMeesage}</span>
        </div>
        <img onClick={() => setVision(false)} id="errorClose" src="./images/error_close.svg" alt="error_off" />
      </div>
    </>

  )
}

export default App
