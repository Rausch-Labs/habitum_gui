import * as React from 'react';
import { Connection } from '../../components/Connection/Connection';
import { HabitCalender } from '../../components/HabitCalender/HabitCalender';
import { TerminalComponent } from '../../components/Term/Term';
import { useHabitiumContext } from '../../context';
import './Home.css';

interface Props {
  history: any[]
}


export const Home: React.FC<Props> = ({ history }) => {
  const { state } = useHabitiumContext()

  return (
    <div className="Home">
      <Connection/>
      <TerminalComponent/>
      {(state.connection.graphql.authenticated || state.connection.grpc.authenticated) &&
        <>
          <HabitCalender />
        </>
        }
    </div>
  );
};

