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

function DrumDisplay (props) {
  const output = props.output

  return (
    <Container className="h-25 p-1" fluid>
      <Card className="bg-info h-100 rounded-lg text-center" id="display">
        <Card.Body className="center-vertical">{output}</Card.Body>
      </Card>
    </Container>
  )
}

function DrumSet (props) {
  const onClick = props.onClick
  const drumSet = [
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
  ]

  return (
    <Container className="h-75 p-0" fluid>
      {drumSet.map(
        (row, index) => <DrumRow cols={row} key={index} onClick={onClick}/>,
      )}
    </Container>
  )
}

function DrumRow (props) {
  const { cols, onClick } = props

  return (
    <Row className="h-33 m-0">
      {cols.map(
        col => <Col className="p-1" key={col.key}>
          <DrumPad onClick={onClick} pad={col}/>
        </Col>,
      )}
    </Row>
  )
}

function DrumPad (props) {
  const { onClick, pad } = props
  const PATH = process.env.PUBLIC_URL + '/sounds/'
  const WAV = '.wav'

  return (
    <Button
      block className="drum-pad h-100 p-0 rounded-lg" id={pad.name}
      onClick={onClick} value={pad.name} variant="info"
    >
      {pad.key}
      <audio className="clip" id={pad.key} src={PATH + pad.name + WAV}/>
    </Button>
  )
}

export default App
