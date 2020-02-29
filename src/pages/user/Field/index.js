import React from 'react';
import {
  Col,
  Row,
  Table,
} from 'react-bootstrap';

class Field extends React.Component {

  getStatus = (i = 0) => {
    if (i === 1) return 'Playing';
    if (i === 2) return 'On Deck';
    if (i === 3) return 'In The Hall';
    return ''
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <h2>Games</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{this.props.fieldName} Field</h3>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Home</th>
                  <th>Away</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.props.games.map((game, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{game.home.name}</td>
                      <td>{game.away.name}</td>
                      <td>{this.getStatus(i + 1)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    );
  }
};

export default Field;