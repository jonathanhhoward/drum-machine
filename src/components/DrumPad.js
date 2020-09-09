import React from 'react'
import Button from 'react-bootstrap/Button'

function DrumPad ({ pad, onClick }) {
  return (
    <Button
      block
      className="drum-pad h-100 p-0 rounded-lg"
      id={pad.name}
      onClick={onClick}
      value={pad.name}
      variant="info"
    >
      {pad.key}
      <audio
        className="clip"
        id={pad.key}
        src={`${process.env.PUBLIC_URL}/sounds/${pad.name}.wav`}
      />
    </Button>
  )
}

export default DrumPad
