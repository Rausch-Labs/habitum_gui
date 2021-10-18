import * as React from 'react';
import { Connection } from '../../components/Connection/Connection';
import { HabitCalender } from '../../components/HabitCalender/HabitCalender';
import { Note } from '../../components/Note/Note';
import { TerminalComponent } from '../../components/Term/Term';
import './Home.css';

interface Props {
  history: any[]
}


export const Home: React.FC<Props> = ({ history }) => {

  return (
    <div className="Home">
      <Connection/>
      <TerminalComponent/>
      <HabitCalender />
      <Note/>
    </div>
  );
};

