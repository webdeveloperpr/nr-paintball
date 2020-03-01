/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDivision = /* GraphQL */ `
  subscription OnCreateDivision {
    onCreateDivision {
      id
      name
    }
  }
`;
export const onUpdateDivision = /* GraphQL */ `
  subscription OnUpdateDivision {
    onUpdateDivision {
      id
      name
    }
  }
`;
export const onDeleteDivision = /* GraphQL */ `
  subscription OnDeleteDivision {
    onDeleteDivision {
      id
      name
    }
  }
`;
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
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
