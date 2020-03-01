import React from 'react';
import {
  Col,
  Row,
  Form,
  Table,
  Button,
} from 'react-bootstrap';

class Divisions extends React.Component {
  render() {
    return (
      <>
        <Row className="mb-4">
          <Col>
            <h2>Division</h2>
            <hr />
            <Button onClick={this.props.createDivision}>
              Add Division
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Division</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.divisions.map((division, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={division.name}
                          onChange={e => this.props.updateDivision(division.id, e.target.value)}
                        >
                        </Form.Control>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => this.props.deleteDivision(division.id)}
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

export default Divisions;
