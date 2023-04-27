import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/store';
import { HOME, HISTORY } from 'constants/routes';

import Topbar from './components/Topbar';
import Home from './screens/Home';
import History from './screens/History';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.container}>
    <Topbar />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={HOME} component={Home} />
        <Route exact path={HISTORY} component={History} />
        <Route render={() => <Redirect to={HOME} />} />
      </Switch>
    </ConnectedRouter>
  </div>
);

export default App;
