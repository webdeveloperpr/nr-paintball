import React, { Fragment } from 'react';
import {
  Col,
  Row,
  Form,
  Table,
  Button,
} from 'react-bootstrap';

class Teams extends React.Component {
  render() {
    if (!this.props.divisions.length) return <p>Add a division!</p>

    return this.props.divisions.map(division => {
      const teams = this.props.teams.filter(team => team.divisionId === division.id);
      if (!teams.length) return null;
      return (
        <Fragment key={division.id}>
          <Row>
            <Col>
              <h2>{division.name} Teams</h2>
            </Col>
          </Row>
          <Row>
            <Col className="mb-4">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>Division</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={team.name}
                            onChange={e => this.props.updateTeam(team, {
                              name: e.target.value,
                            })}
                          >
                          </Form.Control>
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            value={team.divisionId}
                            onChange={e => {
                              e.preventDefault();
                              this.props.updateTeam(team, {
                                divisionId: e.target.value,
                              })
                            }}
                          >
                            {this.props.divisions
                              .map((division, i) => <option key={i} value={division.id}>{division.name}</option>)
                            }
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
              <Button onClick={() => this.props.createTeam({
                divisionId: division.id,
              })}>
                Add Team
              </Button>
            </Col>
          </Row>
        </Fragment>
      );
    });
  }
};

export default Teams;