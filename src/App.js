import React, { useState, useEffect } from 'react'
import DrumDisplay from './components/DrumDisplay'
import DrumSet from './components/DrumSet'
import Container from 'react-bootstrap/Container'
import './App.css'

function App () {
  const [output, setOutput] = useState('select pad')

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleKeyDown ({ key }) {
    const KEY = key.toUpperCase()

    if (!['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(KEY))
      return

    const audioElem = document.getElementById(KEY)
    const button = audioElem.closest('.drum-pad')
    setOutput(button.value)
    audioElem.play()
  }

  function handleClick ({ target: button }) {
    const audioElem = button.querySelector('.clip')
    setOutput(button.value)
    audioElem.play()
  }

  return (
    <Container className="bg-dark m-0 p-1 vh-100" fluid id="drum-machine">
      <DrumDisplay output={output}/>
      <DrumSet onClick={handleClick}/>
    </Container>
  )
}

export default App
