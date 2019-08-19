import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      output: 'select pad',
      drumSet: [
        [
          { key: 'Q', name: 'open-hat' },
          { key: 'W', name: 'closed-hat' },
          { key: 'E', name: 'crash' },
        ],
        [
          { key: 'A', name: 'side-stick' },
          { key: 'S', name: 'snare' },
          { key: 'D', name: 'snare-buzz' },
        ],
        [
          { key: 'Z', name: 'clap' },
          { key: 'X', name: 'tom' },
          { key: 'C', name: 'kick' },
        ],
      ],
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  playAudio = (audioElem) => {
    audioElem.play()
  }

  handleKeyDown = (event) => {
    const DRUM_PAD = '.drum-pad'
    const key = event.key.toUpperCase()
    if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(key)) {
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
    const drumSet = this.state.drumSet
    return (
      <Container className="py-3" id="drum-machine">
        <Display output={output}/>
        <DrumSet onClick={handleClick} rows={drumSet}/>
      </Container>
    )
  }
}

function Display (props) {
  const output = props.output
  return (
    <Card id="display" className="bg-light text-center m-3">
      <Card.Body className="p-2">{output}</Card.Body>
    </Card>
  )
}

function DrumSet (props) {
  const onClick = props.onClick
  const rows = props.rows
  return (
    <Container>{
      rows.map(
        (row, index) => <DrumRow cols={row} key={index} onClick={onClick}/>,
      )
    }</Container>
  )
}

function DrumRow (props) {
  const onClick = props.onClick
  const cols = props.cols
  return (
    <Row className="my-4">{
      cols.map(
        col => <Col key={col.key}><DrumPad onClick={onClick} pad={col}/></Col>,
      )
    }</Row>
  )
}

function DrumPad (props) {
  const onClick = props.onClick
  const pad = props.pad
  const PATH = 'sounds/'
  const WAV = '.wav'
  return (
    <Button
      block className="drum-pad" id={pad.name} onClick={onClick}
      value={pad.name} variant="primary"
    >
      {pad.key}
      <audio className="clip" id={pad.key} src={PATH + pad.name + WAV}/>
    </Button>
  )
}

export default App
