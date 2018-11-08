import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';
import EditTaskForm from './edit_task';
import Header from './header';
import NewTaskForm from './new_task';
import TaskList from './tasks';
import RegistrationForm from './register_user';

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
    api.create_session('alice', 'pass');
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
          <Route path="/new_user" exact={true} render={() =>
            <RegistrationForm />
          } />
          <Route path="/new_task" exact={true} render={() =>
            <NewTaskForm />
          } />
          <Route path="/tasks/:id" exact={true} render={({ match }) =>
            <EditTaskForm path={match.params.id} />
          } />
        </div>
      </Router>
    </div>;
  }
}
