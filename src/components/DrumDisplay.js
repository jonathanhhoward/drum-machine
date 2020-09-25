import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function DrumDisplay({ output }) {
  return (
    <Container className="h-25 p-1" fluid>
      <Card className="bg-info h-100 rounded-lg text-center" id="display">
        <Card.Body className="center-vertical">{output}</Card.Body>
      </Card>
    </Container>
  );
}

export default DrumDisplay;
