import React from 'react';
import {
  Col,
  Row,
  Form,
  Table,
  Button,
} from 'react-bootstrap';

class Fields extends React.Component {
  render() {
    return (
      <>
        <Row className="mb-4">
          <Col>
            <h2>Fields</h2>
            <hr />
            <Button onClick={this.props.createField}>
              Add Field
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Field</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.fields.map((field, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={field.name}
                          onChange={e => this.props.updateField(field.id, e.target.value)}
                        >
                        </Form.Control>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => this.props.deleteField(field.id)}
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

export default Fields;
