import './Connection.css'
import * as React from 'react';
import { useHabitiumContext } from '../../context';
import { useEffect, useState } from 'react';

export const Connection: React.FC = () => {
  const { state } = useHabitiumContext()

  const [graphQLStatus, setGraphQLStatus] = useState("#d28445")
  const [gRPCStatus, setGRPCStatus] = useState("#d28445")

  console.log(state.connection)

  useEffect(() => {
    state.connection.grpc?.online ? setGRPCStatus("#00D395") : setGRPCStatus("#d28445")
    state.connection.graphql?.online ? setGraphQLStatus("#00D395") : setGraphQLStatus("#d28445")

  }, [state.connection])

  return (
    <>
      <div className='status-row'>
        <div className="status">
          <div className="status-signal" style={{backgroundColor: graphQLStatus}} />
          <div>
            habitium_graphQL
          </div>
        </div>
        <div className="status">
          <div className="status-signal" style={{backgroundColor: gRPCStatus}} />
          <div>
            habitium_gRPC
          </div>
        </div>
      </div>
    </>
  )
}