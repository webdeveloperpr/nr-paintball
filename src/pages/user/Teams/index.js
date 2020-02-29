import React from 'react';
import {
  Col,
  Row,
  Table,
} from 'react-bootstrap';

class Teams extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col>
            <h2>Teams</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {this.props.teams
                  .filter(x => x !== ' ')
                  .map((team, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{team}</td>
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

export default Teams;