/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDivision = /* GraphQL */ `
  query GetDivision($id: ID!) {
    getDivision(id: $id) {
      id
      name
    }
  }
`;
export const listDivisions = /* GraphQL */ `
  query ListDivisions(
    $filter: ModelDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      divisionId
      division {
        id
        name
      }
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        divisionId
        division {
          id
          name
        }
      }
      nextToken
    }
  }
`;
export const getField = /* GraphQL */ `
  query GetField($id: ID!) {
    getField(id: $id) {
      id
      name
    }
  }
`;
export const listFields = /* GraphQL */ `
  query ListFields(
    $filter: ModelFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFields(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      homeId
      awayId
      fieldId
      field {
        id
        name
      }
      home {
        id
        name
        divisionId
        division {
          id
          name
        }
      }
      away {
        id
        name
        divisionId
        division {
          id
          name
        }
      }
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        homeId
        awayId
        fieldId
        field {
          id
          name
        }
        home {
          id
          name
          divisionId
        }
        away {
          id
          name
          divisionId
        }
      }
      nextToken
    }
  }
`;
