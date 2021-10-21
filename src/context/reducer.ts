import { ConnectionState, SetConnection, SetData, State } from "./interfaces";

export const setData = (dispatch: React.Dispatch<Action>, data: any) => {
  return dispatch({
    type: "SET_DATA",
    data: data
  })
}

export const setConnection = (dispatch: React.Dispatch<Action>, data: ConnectionState) => {
  return dispatch({
    type: "SET_CONNECTION",
    data: {
      graphql: data,
      grpc: data
    }
  })
}


// Defining what actions are available
export type Action = (SetConnection | SetData)

// Reducer returns the state from dispatched methods.
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_CONNECTION": {
      return Object.assign({}, state, { connection: action.data })
    }
    case "SET_DATA": {
      return Object.assign({}, state, { data: action.data })
    }
    default:
      throw new Error('Invalid Action');
  }
}

export default reducer