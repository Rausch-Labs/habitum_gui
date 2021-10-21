
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { State } from "./interfaces";
import * as React from 'react';
import GRAPHQL_CLIENT from "../services/graphQL";
import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import reducer, { Action, setConnection, setData } from "./reducer";
//import GRPC_CLIENT from "../services/gRPC";

const INITIAL_STATE: State = {
  data: undefined,
  connection: {
    grpc: {
      online: false,
      authenticated: false
    },
    graphql: {
      online: false,
      authenticated: false
    },
  }
}

type Client = ApolloClient<NormalizedCacheObject>

const getFetchData = () => async (client: Client) => {
  const tokensQuery = gql`
    query {
      GetAllHabitLogs {
        status
        message
        dataList {
          date
          id
          type
        }
      }
    }
  `
  return client.query({
    query: tokensQuery,
  })
};

const getAuthenticate = () => async (client: Client, username: string, password: string) => {
  const tokensQuery = gql`
    query {
      AuthorizeUser(request: {
        username: "${username}",
        password: "${password}"
      }) {
        message
        status
        jwt {
          token
        }
      }
    }`
  
  const response = client.query({
    query: tokensQuery,
  })

  
  return response
};

const getPingService = () => async (client: Client) => {
  const tokensQuery = gql`
    query {
      Ping {
        status
      }
    }
  `
  const res = client.query({
    query: tokensQuery,

  })
  return res
};

const INITIAL_CONTEXT = {
  // Definig types here
  state: INITIAL_STATE,
  habitum_GraphQL: GRAPHQL_CLIENT,
  // habitum_gRPC: GRPC_CLIENT
  fetchData: (_: Client): any => { },
  pingService: (_: Client): any => { },
  authenticateUser: (_:Client, _username: string, _password: string): any => { },
  dispatch: (_: Action) => { },
  
}

// Creating the context
const HabitiumContext = createContext(INITIAL_CONTEXT);

// Export a function to use the context
export function useHabitiumContext() {
  return useContext(HabitiumContext);
}


interface ProviderProps {
  loader?: React.ReactNode;
}

// Provider provides the context state to the DOM
export const HabitumProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchData = getFetchData()
  const pingService = getPingService()
  const authenticateUser = getAuthenticate()

  return (
    <HabitiumContext.Provider
      value={
        useMemo(() => ({
          state: state,
          habitum_GraphQL: GRAPHQL_CLIENT,
          // habitum_gRPC: GRPC_CLIENT,
          fetchData: fetchData,
          dispatch: dispatch,
          pingService: pingService,
          authenticateUser: authenticateUser

        }), [state, fetchData, dispatch, pingService, authenticateUser]
        )}
    >
      {children}
    </HabitiumContext.Provider>
  );
};

// Updater uses useEffect to update anything upon rendering
export const HabitumUpdater: React.FC = () => {
  const { state, habitum_GraphQL, fetchData, dispatch, pingService } = useHabitiumContext()

  const ping = () => {
    pingService(habitum_GraphQL).then((data: any) => {
      console.log('habitum_GraphQL ping successful', data)
      setConnection(dispatch, { online: true, authenticated: state.connection.graphql.authenticated })
    }).catch((e: any) => {
      console.error('habitum_GraphQL ping failed', e)
      setConnection(dispatch, { online: false, authenticated: false  })
    })
  }

  // Fetch
  useEffect(() => {
    if (state.connection.graphql) {
      fetchData(habitum_GraphQL).then((data: any) => {
        setData(dispatch, data.data)
      }).catch((e: any) => {
        console.error(e)
      })
    }
    // eslint-disable-next-line
  }, [state.connection.graphql, habitum_GraphQL])

  // Ping
  useEffect(() => {
    ping()
    const id = setInterval(() => {
      ping()
    }, 5000)

    return () => clearInterval(id)
    // eslint-disable-next-line
  }, [state.connection.graphql.authenticated, state.connection.grpc.authenticated])

  return null
}