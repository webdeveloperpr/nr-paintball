/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDivision = /* GraphQL */ `
  mutation CreateDivision(
    $input: CreateDivisionInput!
    $condition: ModelDivisionConditionInput
  ) {
    createDivision(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const updateDivision = /* GraphQL */ `
  mutation UpdateDivision(
    $input: UpdateDivisionInput!
    $condition: ModelDivisionConditionInput
  ) {
    updateDivision(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const deleteDivision = /* GraphQL */ `
  mutation DeleteDivision(
    $input: DeleteDivisionInput!
    $condition: ModelDivisionConditionInput
  ) {
    deleteDivision(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
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
export const createField = /* GraphQL */ `
  mutation CreateField(
    $input: CreateFieldInput!
    $condition: ModelFieldConditionInput
  ) {
    createField(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const updateField = /* GraphQL */ `
  mutation UpdateField(
    $input: UpdateFieldInput!
    $condition: ModelFieldConditionInput
  ) {
    updateField(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const deleteField = /* GraphQL */ `
  mutation DeleteField(
    $input: DeleteFieldInput!
    $condition: ModelFieldConditionInput
  ) {
    deleteField(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
