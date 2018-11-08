import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

import api from './api';


function NewTaskForm(props) {
  let { session, users, new_task_form, dispatch } = props;

  if (!session) {
    return <Redirect to={{pathname:"/", state: "Please sign in"}} />
  }

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    api.create_task(new_task_form.get('name'),
                    new_task_form.get('description'),
                    new_task_form.get('user_id'));
    return false;
  }

  function dispatchHelper(key, value) {
    let action = {
      type: "UPDATE_NEW_TASK_FORM",
      data: {
        key: key,
        value: value
      },
    }
    dispatch(action);
  }

  if (!new_task_form.get('user_id')) {
    dispatchHelper('user_id', session.user_id || 1);
    dispatchHelper('user_name', session.user_name || 'alice');
  }

  let user_options = _.map(users, (user) =>
    <button key={`new-task-user-assign-${user.id}`} className="dropdown-item" type="button"
      onClick={() => {
        dispatchHelper("user_name", user.name);
        dispatchHelper("user_id", user.id);
      }} >
      {user.name}
    </button>);

  return <form onSubmit={(ev) => handleSubmit(ev)}>

    <div className="form-group row">
      <label>Task name</label>
      <input type="text" className="form-control"
        onChange={(ev) => dispatchHelper("name", ev.target.value)} value={new_task_form.get('name')} />
    </div>

    <div className="form-group row">
      <label>Description</label>
      <textarea type="doc" className="form-control" id="new-task-desc"
        onChange={(ev) => dispatchHelper("description", ev.target.value)} value={new_task_form.get('description')} />
    </div>

    <div className="form-group">
      <label>Assigned to:</label>
      <div className="btn-group">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={!session}>
          {new_task_form.get("user_name")}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          {user_options}
        </div>
      </div>
    </div>

    <div>
      <Link to="/" onClick={() => {
          handleSubmit();
        }}
        className="btn btn-primary" >Create Task</Link>
      <Link to="/" className="btn btn-secondary" >Save and cancel</Link>
      <Link to="/" onClick={() => {
          api.clear_new_task_form();
        }}
        className="btn btn-danger" >Cancel</Link>
    </div>
  </form>
}

function state2props(state) {
  return {
    session: state.session,
    users: state.users,
    new_task_form: state.new_task_form,
  };
}

export default connect(state2props)(NewTaskForm);
// Export result of curried function call.