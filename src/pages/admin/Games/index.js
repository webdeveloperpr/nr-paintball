import React, { Fragment } from 'react';
import {
  Col,
  Row,
  Table,
  Form,
  Button,
} from 'react-bootstrap';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { map, nth, __, pick } from 'ramda';

const pickIdx = (arr, indexes) => map(nth(__, arr), indexes)

const SortableItem = SortableElement((props) => <tr>{props.children}</tr>);
const SortableList = SortableContainer((props) => <tbody>{props.children}</tbody>);

const TeamSelectInput = (props) => {
  const { teams, game, teamId, updateGame, propName } = props;
  return (
    <Form.Control
      as="select"
      value={teamId}
      onChange={e => updateGame(game.id, { [propName]: e.target.value })}
    >
      {teams
        .filter(team => team !== game.away)
        .map((team, i) => <option key={i} value={team.id}>{team.name}</option>)
      }
    </Form.Control>
  )
};

class Games extends React.Component {

  getStatus = (i = 0) => {
    if (i === 1) return 'Playing';
    if (i === 2) return 'On Deck';
    if (i === 3) return 'In The Hall';
    return ''
  };

  swap = (game1, game2) => {
    this.props.updateGame(game2.id, { ...pick(['homeId', 'awayId'], game1) });
    this.props.updateGame(game1.id, { ...pick(['homeId', 'awayId'], game2) });
  };

  onSortEnd = (items, swap) => ({ newIndex, oldIndex }) => {
    const [before, after] = pickIdx(items, [newIndex, oldIndex])
    swap(before, after);
  }

  render() {
    if (!this.props.fields.length) return 'Add a field!';
    if (!this.props.teams.length) return 'Add 2 teams!';
    if (!this.props.divisions.length) return 'Add a division!';

    return (
      <Fragment>
        <Row>
          <Col>
            <h2>Games</h2>
            <hr />
          </Col>
        </Row>

        {this.props.fields.map(({ id: fieldId, name: fieldName }) => (
          <Row key={fieldId} className="mb-4">
            <Col>
              <h4>{fieldName} Field</h4>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Home</th>
                    <th>Away</th>
                    <th></th>
                  </tr>
                </thead>

                <SortableList onSortEnd={this.onSortEnd(this.props.games.filter(game => game.fieldId === fieldId), this.swap)}>
                  {this.props.games.filter(game => game.fieldId === fieldId)
                    .map((game, i) => {
                      return (
                        <SortableItem
                          key={game.id}
                          index={i}
                        >
                          <td>{i + 1}</td>
                          <td>
                            <TeamSelectInput
                              propName="homeId"
                              updateGame={this.props.updateGame}
                              teams={this.props.teams}
                              game={game}
                              teamId={game.homeId}
                            />
                          </td>
                          <td>
                            <TeamSelectInput
                              propName="awayId"
                              updateGame={this.props.updateGame}
                              teams={this.props.teams}
                              game={game}
                              teamId={game.awayId}
                            />
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                const ok = window.confirm("Press a button!");
                                if (ok) this.props.deleteGame(game.id);
                              }}
                            >
                              x
                        </Button></td>
                        </SortableItem>
                      )
                    })}
                </SortableList>
              </Table>
              <Button
                onClick={() => this.props.createGame({
                  fieldId,
                  homeId: this.props.teams[0].id,
                  awayId: this.props.teams[0].id,
                })}
              >
                Add Game
            </Button>
            </Col>
          </Row>
        ))}
      </Fragment>
    );
  }
};

export default Games;