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

  handleKeyDown = ({ key }) => {
    const KEY = key.toUpperCase()

    if (!['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(KEY))
      return

    const audioElem = document.getElementById(KEY)
    const button = audioElem.closest('.drum-pad')
    this.setState({ output: button.value })
    audioElem.play()
  }

  handleClick = ({ target: button }) => {
    const audioElem = button.querySelector('.clip')
    this.setState({ output: button.value })
    audioElem.play()
  }

  render () {
    return (
      <Container className="bg-dark m-0 p-1 vh-100" fluid id="drum-machine">
        <DrumDisplay output={this.state.output}/>
        <DrumSet onClick={this.handleClick}/>
      </Container>
    )
  }
}

export default App
