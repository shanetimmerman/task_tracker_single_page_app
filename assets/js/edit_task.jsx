import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

import api from './api';


function EditTaskForm(props) {
  console.log(props)
  let session = props.session;
  console.log(session);
  let { users, tasks, path } = props;
  let id_num = parseInt(window.location.pathname.substring("/tasks/".length));

  // if (!session || tasks.length < id_num ) {
  //   return <Redirect to={{pathname:"/", state: "Please sign in"}} />
  // }

  let task = tasks.find((task) => task.id == id_num);

  function handleSubmit(event) {
    event.preventDefault();
    let name = event.target[0].value;
    let description = event.target[1].value;
    let user_name = event.target[2].value;
    let time = event.target[3].value;
    let completed = event.target[4].value;
    api.update_task();
    return false;
  }

  let user_options = _.map(users, (user) =>
    <button key={`new-task-user-assign-${user.id}`} className="dropdown-item" type="button"
      onClick={() => {
        // dispatchHelper("user_name", user.name);
        // dispatchHelper("user_id", user.id);
      }} >
      {user.name}
    </button>);

  return <form onSubmit={(ev) => handleSubmit(ev)}>

    <div className="form-group row">
      <label>Task name</label>
      <input type="text" className="form-control"
        onChange={(ev) => dispatchHelper("name", ev.target.value)} value={task.name} />
    </div>

    <div className="form-group row">
      <label>Description</label>
      <textarea type="doc" className="form-control" id="new-task-desc"
        onChange={(ev) => dispatchHelper("description", ev.target.value)} value={task.description} />
    </div>

    <div className="form-group">
      <label>Assigned to:</label>
      <div className="btn-group">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={!session}>
          {task.user_name}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          {user_options}
        </div>
      </div>
    </div>

    <div className="form-group">
      <label>Time:</label>
      <input min={0} step={15} />
    </div>

    <div className="form-group custom-control custom-checkbox">
      <label>Complete</label>
      <input type="checkbox" className="custom-control-input" checked={task.completed} />
    </div>

    <div>
      <Link to="/" onClick={() => {
          handleSubmit();
        }}
        className="btn btn-secondary" >Submit</Link>
    </div>
  </form>
}

function state2props(state) {
  return {
    session: state.session,
    users: state.users,
    tasks: state.tasks,
  };
}

export default connect(state2props)(EditTaskForm);
// Export result of curried function call.