import React from 'react'
import Button from 'react-bootstrap/Button'

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

export default DrumPad
