import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Home } from './Home/Home';
import './App.css';
import { HabitumProvider, HabitumUpdater } from '../context/index';

interface Props { }

class App extends React.Component<Props> {
  public render() {
    return (
      <HashRouter>
        <HabitumProvider>
          <HabitumUpdater />
          <div className="App">
            <section className={'App__section App__section--small'}>
              <Switch>
                <Route path="/" exact={true} component={Home} />
                {/*<Route component={NotFound} />*/}
              </Switch>
            </section>
          </div>
        </HabitumProvider>
      </HashRouter>
    );
  }
}

export default App;
