export interface State {
  data: any | undefined
  connection: ConnectionsState
}

export interface ConnectionsState {
  gRPC: ConnectionState,
  graphQL: ConnectionState
}

export interface ConnectionState {
  online: boolean,
  authenticated: boolean
}
