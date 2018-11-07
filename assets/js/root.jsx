import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';
import Header from './header';
import TaskList from './tasks';
import UserList from './users';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    // TODO Temporarily sign in as default
    api.create_session("alice", "pass");  
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <TaskList />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList />
          } />
        </div>
      </Router>
    </div>;
  }
}
