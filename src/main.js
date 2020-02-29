import React, { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {
  Navbar,
  Nav,
  Container
} from 'react-bootstrap';

// Admin Pages
import AdminGames from './pages/admin/Games';
import AdminTeams from './pages/admin/Teams';

// User Pages
import Field from './pages/user/Field';
import UserTeams from './pages/user/Teams';


import API, { graphqlOperation } from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';

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
} from './graphql/mutations';

// Queries
import {
  listTeams,
  listGames,
  listFields,
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

} from './graphql/subscriptions';

import awsconfig from './aws-exports';
import './App.css';

API.configure(awsconfig);
PubSub.configure(awsconfig);

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


const initialState = {
  teams: [],
  fields: [],
  games: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        teams: action.teams,
        fields: action.fields,
        games: action.games,
      };

    // TEAM CASE
    case CREATE_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.team]
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
    case DELETE_FIELD:
      return {
        ...state,
        fields: [...state.fields].filter(({ id }) => id !== action.field.id),
      }

    // GAME CASE
    case CREATE_GAME:
      return {
        ...state,
        games: [...state.games, action.game]
      }
    case DELETE_GAME:
      return {
        ...state,
        games: [...state.games].filter(({ id }) => id !== action.game.id),
      }

    default:
      return state;
  }
};

// TEAM ACTIONS
async function createTeamAction(name) {
  const team = { name };
  await API.graphql(graphqlOperation(createTeam, { input: team }));
}

async function deleteTeamAction(id) {
  await API.graphql(graphqlOperation(deleteTeam, { input: { id } }));
}

// FIELD ACTIONS
async function createFieldAction(name) {
  const field = { name };
  await API.graphql(graphqlOperation(createField, { input: field }));
}

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

async function updateGameAction(props) {
  await API.graphql(graphqlOperation(updateGame, { input: props }));
}

async function deleteGameAction(id) {
  await API.graphql(graphqlOperation(deleteGame, { input: { id } }));
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getData() {
      const teamData = await API.graphql(graphqlOperation(listTeams));
      const fieldData = await API.graphql(graphqlOperation(listFields));
      const gameData = await API.graphql(graphqlOperation(listGames));

      dispatch({
        type: QUERY,
        teams: teamData.data.listTeams.items,
        fields: fieldData.data.listFields.items,
        games: gameData.data.listGames.items,
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

    return () => {
      teamSubscriptions.forEach(sub => sub.unsubscribe());
      fieldSubscriptions.forEach(sub => sub.unsubscribe());
      gameSubscriptions.forEach(sub => sub.unsubscribe());
    }
  }, []);

  console.log(state.games);

  return (
    <div className="App">
      <div>
        <h1>Teams</h1>
        <input type="text" onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            createTeamAction(e.target.value);
            e.target.value = '';
          }
        }} />
        <div>
          {state.teams.length > 0
            ? state.teams.map((team) => (
              <div key={team.id}>
                <p >{team.name} {` `} <span onClick={() => deleteTeamAction(team.id)}> X </span></p>
              </div>
            ))
            : <p>Add some teams!</p>
          }
        </div>
      </div>

      <div>
        <h1>Fields</h1>
        <input type="text" onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            createFieldAction(e.target.value);
            e.target.value = '';
          }
        }} />
        <div>
          {state.fields.length > 0
            ? state.fields.map((field) => (
              <div key={field.id}>
                <p >{field.name} {` `} <span onClick={() => deleteFieldAction(field.id)}> X </span></p>
              </div>
            ))
            : <p>Add some fields!</p>
          }
        </div>
      </div>

      <div>
        <h1>Games</h1>
        <div>
          {state.teams.length && state.fields.length
            ? (
              <button
                onClick={() => createGameAction({
                  fieldId: state.fields[0].id,
                  awayId: state.teams[0].id,
                  homeId: state.teams[0].id,
                })}
              >
                Add some games!
              </button>
            )
            : ''
          }
          {state.games.length > 0
            ? state.games.map((game) => (
              <div key={game.id}>
                {/* Field Selector */}
                <select
                  value={game.fieldId}
                  onChange={e => updateGameAction({
                    fieldId: e.target.value,
                    id: game.id
                  })}
                >
                  {state.fields.map(field => (<option key={field.id} value={field.id}>{field.name}</option>))}
                </select>

                {/* Home Team Selector */}
                <select
                  value={game.homeId}
                  onChange={e => {
                    updateGameAction({
                      id: game.id,
                      homeId: e.target.value,
                    })
                  }}
                >
                  {state.teams.map(team => (<option key={team.id} value={team.id}>{team.name}</option>))}
                </select>

                {/* Away Team Selector */}
                <select
                  value={game.awayId}
                  onChange={e => {
                    updateGameAction({
                      id: game.id,
                      awayId: e.target.value,
                    })
                  }}
                >
                  {state.teams.map(team => (<option key={team.id} value={team.id}>{team.name}</option>))}
                </select>

                <p ><span onClick={() => deleteGameAction(game.id)}> X </span></p>
              </div>
            ))
            : <p>Add Some Games!</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;