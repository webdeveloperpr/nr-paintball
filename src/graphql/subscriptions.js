/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
      id
      name
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
      id
      name
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
      id
      name
    }
  }
`;
export const onCreateField = /* GraphQL */ `
  subscription OnCreateField {
    onCreateField {
      id
      name
    }
  }
`;
export const onUpdateField = /* GraphQL */ `
  subscription OnUpdateField {
    onUpdateField {
      id
      name
    }
  }
`;
export const onDeleteField = /* GraphQL */ `
  subscription OnDeleteField {
    onDeleteField {
      id
      name
    }
  }
`;
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
      }
      away {
        id
        name
      }
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
      }
      away {
        id
        name
      }
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
      }
      away {
        id
        name
      }
    }
  }
`;
