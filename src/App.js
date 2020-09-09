import React from 'react'
import DrumDisplay from './components/DrumDisplay'
import DrumSet from './components/DrumSet'
import Container from 'react-bootstrap/Container'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = { output: 'select pad' }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  playAudio = (audioElem) => {
    audioElem.play().catch(err => console.log(err))
  }

  handleKeyDown = (event) => {
    const DRUM_PAD = '.drum-pad'
    const VALID_KEYS = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
    const key = event.key.toUpperCase()

    if (VALID_KEYS.includes(key)) {
      const element = document.getElementById(key)
      const parent = element.closest(DRUM_PAD)
      this.setState({ output: parent.value })
      this.playAudio(element)
    }
  }

  handleClick = (event) => {
    const CLIP = '.clip'
    const element = event.target
    this.setState({ output: element.value })
    this.playAudio(element.querySelector(CLIP))
  }

  render () {
    const handleClick = this.handleClick
    const output = this.state.output

    return (
      <Container className="bg-dark m-0 p-1 vh-100" fluid id="drum-machine">
        <DrumDisplay output={output}/>
        <DrumSet onClick={handleClick}/>
      </Container>
    )
  }
}

export default App
