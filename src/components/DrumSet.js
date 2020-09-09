import React from 'react'
import DrumPad from './DrumPad'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
      {drumSet.map((row, rowIndex) => (
        <Row className="h-33 m-0" key={rowIndex}>
          {row.map((col, colIndex) => (
            <Col className="p-1" key={colIndex}>
              <DrumPad pad={col} onClick={onClick}/>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default DrumSet
