import { ConnectionState, State } from "./interfaces";

export interface SetConnection {
  type: "SET_CONNECTION",
  data: {
    graphQL?: any,
    grpc?: any
  }
}

export interface SetData {
  type: "SET_DATA",
  data: {
    data: any
  }
}

export const setData = (dispatch: React.Dispatch<Action>, data: any) => {
  dispatch({
    type: "SET_DATA",
    data: data
  })
}

export const setConnection = (dispatch: React.Dispatch<Action>, data: ConnectionState) => {
  
  dispatch({
    type: "SET_CONNECTION",
    data: {
      graphQL: data 
    }
  })
}


// Defining what actions are available
export type Action = (SetConnection | SetData)

// Reducer returns the state from dispatched methods.
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_CONNECTION": {
      return Object.assign({}, state, { connection: {
        graphQL: action.data.graphQL,
        gRPC: action.data.grpc,
      }})
    }
    case "SET_DATA": {
      return Object.assign({}, state, { data: action.data })
    }
    default:
      throw new Error('Invalid Action');
  }
}

export default reducer