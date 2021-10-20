export interface State {
  data: any | undefined
  connection: ConnectionsState
}

export interface ConnectionsState {
  grpc: ConnectionState,
  graphql: ConnectionState
}

export interface ConnectionState {
  online: boolean,
  authenticated: boolean
}


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
