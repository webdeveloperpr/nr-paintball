import React from 'react';
import {
  Col,
  Row,
  Form,
  Table,
  Button,
} from 'react-bootstrap';

class Teams extends React.Component {
  render() {
    return (
      <>
        <Row className="mb-4">
          <Col>
            <h2>Teams</h2>
            <hr />
            <Button onClick={this.props.createTeam}>
              Add Team
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.teams.map((team, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={team.name}
                          onChange={e => this.props.updateTeam(team.id, e.target.value)}
                        >
                        </Form.Control>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => this.props.deleteTeam(team.id)}
                          variant="danger"
                        >
                          x
                          </Button>
                      </td>
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