import React, { useEffect, useReducer } from 'react';
import { pathOr, includes } from 'ramda';
import debounce from 'lodash.debounce';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import './App.css';
import {
  Navbar,
  Nav,
  Container
} from 'react-bootstrap';

// Admin Pages
import AdminGames from './pages/admin/Games';
import AdminTeams from './pages/admin/Teams';
import AdminFields from './pages/admin/Fields';
import AdminDivision from './pages/admin/Divisions';

// Auth
import { Auth } from 'aws-amplify';
import Authenticate from './components/Auth';
import API, { graphqlOperation } from '@aws-amplify/api';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// User Pages
import Field from './pages/user/Field';

// Mutations
import {
  // Team
  createTeam,
  updateTeam,
  deleteTeam,

  // Field
  createField,
  updateField,
  deleteField,

  // Game
  createGame,
  updateGame,
  deleteGame,

  // Division
  createDivision,
  updateDivision,
  deleteDivision,
} from './graphql/mutations';

// Queries
import {
  listTeams,
  listGames,
  listFields,
  listDivisions,
} from './graphql/queries';

// Subscriptions
import {
  // Team 
  onCreateTeam,
  onUpdateTeam,
  onDeleteTeam,

  // Field
  onCreateField,
  onUpdateField,
  onDeleteField,

  // Game
  onCreateGame,
  onUpdateGame,
  onDeleteGame,

  // Division
  onCreateDivision,
  onUpdateDivision,
  onDeleteDivision,

} from './graphql/subscriptions';

// GET DATA
const QUERY = 'QUERY';

// TEAM TYPEs
const CREATE_TEAM = 'CREATE_TEAM';
const UPDATE_TEAM = 'UPDATE_TEAM';
const DELETE_TEAM = 'DELETE_TEAM';

// FIELD TYPES
const CREATE_FIELD = 'CREATE_FIELD';
const UPDATE_FIELD = 'UPDATE_FIELD';
const DELETE_FIELD = 'DELETE_FIELD';

// GAME TYPES
const CREATE_GAME = 'CREATE_GAME';
const UPDATE_GAME = 'UPDATE_GAME';
const DELETE_GAME = 'DELETE_GAME';

// GAME TYPES
const CREATE_DIVISION = 'CREATE_DIVISION';
const UPDATE_DIVISION = 'UPDATE_DIVISION';
const DELETE_DIVISION = 'DELETE_DIVISION';

// AUTH
const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const initialState = {
  user: {
    id: '',
    username: '',
    email: '',
    groups: [],
    isLoggedIn: false,
    isRef: false,
    isAdmin: false,
  },
  teams: [],
  fields: [],
  games: [],
  divisions: [],
};

// TEAM ACTIONS
async function createTeamAction({ divisionId }) {
  const team = {
    name: '',
    divisionId,
  };
  await API.graphql(graphqlOperation(createTeam, { input: team }));
}

const updateTeamAction = (cb => dispatch => (oldObject, newObject) => {
  const team = {
    ...oldObject,
    ...newObject,
  };
  dispatch({ type: UPDATE_TEAM, team });
  cb(team);
})(debounce(async (team) => await API.graphql(graphqlOperation(updateTeam, { input: team })), 2000))

async function deleteTeamAction(id) {
  await API.graphql(graphqlOperation(deleteTeam, { input: { id } }));
}

// FIELD ACTIONS
async function createFieldAction() {
  const field = { name: ' ' };
  await API.graphql(graphqlOperation(createField, { input: field }));
}

const updateFieldAction = (cb => dispatch => (oldObject, newObject) => {
  const field = {
    ...oldObject,
    ...newObject,
  };
  dispatch({ type: UPDATE_FIELD, field });
  cb(field);
})(debounce(async (field) => await API.graphql(graphqlOperation(updateField, { input: field })), 1500))

async function deleteFieldAction(id) {
  await API.graphql(graphqlOperation(deleteField, { input: { id } }));
}

// GAME ACTIONS
async function createGameAction({ fieldId, homeId, awayId }) {
  const game = {
    fieldId,
    homeId,
    awayId,
  };
  await API.graphql(graphqlOperation(createGame, { input: game }));
}

async function updateGameAction(id, props) {
  const game = {
    id,
    ...props,
  }
  await API.graphql(graphqlOperation(updateGame, { input: game }));
}

async function deleteGameAction(id) {
  await API.graphql(graphqlOperation(deleteGame, { input: { id } }));
}

// DIVISION ACTIONS
async function createDivisionAction() {
  const division = { name: ' ' };
  await API.graphql(graphqlOperation(createDivision, { input: division }));
}

const updateDivisionAction = (cb => dispatch => (id, name) => {
  const division = { id, name };
  dispatch({ type: UPDATE_DIVISION, division });
  cb(division);
})(debounce(async (division) => await API.graphql(graphqlOperation(updateDivision, { input: division })), 2000))

async function deleteDivisionAction(id) {
  await API.graphql(graphqlOperation(deleteDivision, { input: { id } }));
}

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        user: { ...initialState.user },
        teams: action.teams,
        fields: action.fields,
        games: action.games,
        divisions: action.divisions,
      };
    // AUTH
    case AUTH_LOGIN:
      return {
        ...state,
        auth: action.auth,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        auth: { ...initialState.user },
      }
    // TEAM CASE
    case CREATE_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.team]
      }
    case UPDATE_TEAM:
      return {
        ...state,
        teams: [...state.teams].map(team => team.id === action.team.id ? action.team : team)
      }
    case DELETE_TEAM:
      return {
        ...state,
        teams: [...state.teams].filter(({ id }) => id !== action.team.id),
      }

    // FIELD CASE
    case CREATE_FIELD:
      return {
        ...state,
        fields: [...state.fields, action.field]
      }
    case UPDATE_FIELD:
      return {
        ...state,
        fields: [...state.fields].map(field => field.id === action.field.id ? action.field : field)
      }
    case DELETE_FIELD:
      return {
        ...state,
        fields: [...state.fields].filter(({ id }) => id !== action.field.id),
      }

    // GAME CASE
    case CREATE_GAME:
      return {
        ...state,
        games: [...state.games, action.game],
      }
    case UPDATE_GAME:
      return {
        ...state,
        games: [...state.games].map(game => game.id === action.game.id ? action.game : game),
      }
    case DELETE_GAME:
      return {
        ...state,
        games: [...state.games].filter(({ id }) => id !== action.game.id),
      }

    // DIVISON CASE
    case CREATE_DIVISION:
      return {
        ...state,
        divisions: [...state.divisions, action.division]
      }
    case UPDATE_DIVISION:
      return {
        ...state,
        divisions: [...state.divisions].map(division => division.id === action.division.id ? action.division : division)
      }
    case DELETE_DIVISION:
      return {
        ...state,
        divisions: [...state.divisions].filter(({ id }) => id !== action.division.id),
      }


    default:
      return state;
  }
};

const clickBurger = () => {
  const burger = document.querySelector('.navbar-toggler');
  if (burger && burger.offsetWidth) {
    burger.click();
  }
};

const getUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      id: pathOr('', ['id'], user),
      username: pathOr('', ['username'], user),
      email: pathOr('', ['attributes', 'email'], user),
      groups: pathOr([], ['signInUserSession', 'idToken', 'payload', 'cognito:groups'], user),
      isLoggedIn: !!pathOr([], ['signInUserSession', 'idToken', 'payload', 'cognito:groups'], user).length,
      isRef: includes('refs', pathOr([], ['signInUserSession', 'idToken', 'payload', 'cognito:groups'], user)),
      isAdmin: includes('admin', pathOr([], ['signInUserSession', 'idToken', 'payload', 'cognito:groups'], user)),
    };
  } catch (err) {
    return {}
  }
};

const HomeRoute = ({ children, fields, ...props }) => {
  const fieldName = fields.length ? fields[0].name : ''
  return <Route {...props} render={({ location }) => !fieldName ? null : <Redirect to={{ pathname: `/${fieldName}`, state: { from: location } }} />} />;
};

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getData() {
      const teamData = await API.graphql(graphqlOperation(listTeams));
      const fieldData = await API.graphql(graphqlOperation(listFields));
      const gameData = await API.graphql(graphqlOperation(listGames));
      const divisionData = await API.graphql(graphqlOperation(listDivisions));

      dispatch({
        type: QUERY,
        teams: teamData.data.listTeams.items,
        fields: fieldData.data.listFields.items,
        games: gameData.data.listGames.items,
        divisions: divisionData.data.listDivisions.items,
      });
    }
    getData();

    const teamSubscriptions = [
      API
        .graphql(graphqlOperation(onCreateTeam))
        .subscribe({
          next: (eventData) => {
            const team = eventData.value.data.onCreateTeam;
            dispatch({ type: CREATE_TEAM, team });
          }
        }),
      API
        .graphql(graphqlOperation(onDeleteTeam))
        .subscribe({
          next: (eventData) => {
            const team = eventData.value.data.onDeleteTeam;
            dispatch({ type: DELETE_TEAM, team });
          }
        }),
      API
        .graphql(graphqlOperation(onUpdateTeam))
        .subscribe({
          next: (eventData) => {
            const team = eventData.value.data.onUpdateTeam;
            dispatch({ type: UPDATE_TEAM, team });
          }
        }),
    ];

    const fieldSubscriptions = [
      API
        .graphql(graphqlOperation(onCreateField))
        .subscribe({
          next: (eventData) => {
            const field = eventData.value.data.onCreateField;
            dispatch({ type: CREATE_FIELD, field });
          }
        }),
      API
        .graphql(graphqlOperation(onDeleteField))
        .subscribe({
          next: (eventData) => {
            const field = eventData.value.data.onDeleteField;
            dispatch({ type: DELETE_FIELD, field });
          }
        }),
      API
        .graphql(graphqlOperation(onUpdateField))
        .subscribe({
          next: (eventData) => {
            const field = eventData.value.data.onUpdateField;
            dispatch({ type: UPDATE_FIELD, field });
          }
        }),
    ];

    const gameSubscriptions = [
      API
        .graphql(graphqlOperation(onCreateGame))
        .subscribe({
          next: (eventData) => {
            const game = eventData.value.data.onCreateGame;
            dispatch({ type: CREATE_GAME, game });
          }
        }),
      API
        .graphql(graphqlOperation(onDeleteGame))
        .subscribe({
          next: (eventData) => {
            const game = eventData.value.data.onDeleteGame;
            dispatch({ type: DELETE_GAME, game });
          }
        }),
      API
        .graphql(graphqlOperation(onUpdateGame))
        .subscribe({
          next: (eventData) => {
            const game = eventData.value.data.onUpdateGame;
            dispatch({ type: UPDATE_GAME, game });
          }
        }),
    ];

    const divisionSubscriptions = [
      API
        .graphql(graphqlOperation(onCreateDivision))
        .subscribe({
          next: (eventData) => {
            const division = eventData.value.data.onCreateDivision;
            dispatch({ type: CREATE_DIVISION, division });
          }
        }),
      API
        .graphql(graphqlOperation(onDeleteDivision))
        .subscribe({
          next: (eventData) => {
            const division = eventData.value.data.onDeleteDivision;
            dispatch({ type: DELETE_DIVISION, division });
          }
        }),
      API
        .graphql(graphqlOperation(onUpdateDivision))
        .subscribe({
          next: (eventData) => {
            const division = eventData.value.data.onUpdateDivision;
            dispatch({ type: UPDATE_DIVISION, division });
          }
        }),
    ];

    return () => {
      [
        teamSubscriptions,
        fieldSubscriptions,
        gameSubscriptions,
        divisionSubscriptions,
      ].forEach(group => group.forEach(sub => sub.unsubscribe()));
    }
  }, []);


  return (
    <Container fluid>
      <Router>
        <Navbar
          bg="dark"
          variant="dark"
          sticky="top"
          expand="md"
          className="mb-2"
          style={{ margin: '0 -15px' }}
        >
          <Navbar.Brand as={Link} to={'/'}>
            NR-Paintball
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {state.fields.map(field => {
                const route = '/' + field.name;
                return (
                  <Nav.Link key={field.id} onClick={clickBurger} as={Link} to={route}>
                    {field.name} Field
                  </Nav.Link>
                )
              })}
            </Nav>
            <Nav>
              {state.user.isLoggedIn ? null : <Nav.Link onClick={clickBurger} as={Link} to="/sign-in">Sign In</Nav.Link>}
              {state.user.isRef || state.user.isAdmin
                ? (
                  <>
                    <Nav.Link onClick={clickBurger} as={Link} to="/add-games">Add Game</Nav.Link>
                    <Nav.Link onClick={clickBurger} as={Link} to="/add-teams">Add Team</Nav.Link>
                    <Nav.Link onClick={clickBurger} as={Link} to="/add-fields">Add Field</Nav.Link>
                    <Nav.Link onClick={clickBurger} as={Link} to="/add-divisions">Add Divisions</Nav.Link>
                    <Nav.Link onClick={() => Auth.signOut().then(data => console.log(data)).catch(err => console.log(err))} as={Link} to="/">Sign Out</Nav.Link>
                  </>
                )
                : null
              }

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>

          <HomeRoute exact path="/" fields={state.fields} />

          {state.fields.map(field => {
            return (
              <Route exact path={`/${field.name}`} key={field.id}>
                <Field
                  fieldName={field.name}
                  games={state.games.filter(game => game.fieldId === field.id)}
                />
              </Route>
            )
          })}

          <Route exact path="/add-games">
            <AdminGames
              createGame={createGameAction}
              updateGame={updateGameAction}
              deleteGame={deleteGameAction}
              games={state.games}
              teams={state.teams}
              fields={state.fields}
              divisions={state.divisions}
            />
          </Route>

          <Route exact path="/add-fields">
            <AdminFields
              createField={createFieldAction}
              updateField={updateFieldAction(dispatch)}
              deleteField={deleteFieldAction}
              fields={state.fields}
            />
          </Route>

          <Route exact path="/add-divisions">
            <AdminDivision
              createDivision={createDivisionAction}
              updateDivision={updateDivisionAction(dispatch)}
              deleteDivision={deleteDivisionAction}
              divisions={state.divisions}
            />
          </Route>

          <Route exact path="/add-teams">
            <AdminTeams
              divisions={state.divisions}
              createTeam={createTeamAction}
              updateTeam={updateTeamAction(dispatch)}
              deleteTeam={deleteTeamAction}
              teams={state.teams}
            />
          </Route>

          <Route exact path="/sign-in">
            <Authenticate />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;