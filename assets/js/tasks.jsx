import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import api from './api';
import { Redirect, Link } from 'react-router-dom';


function TaskList(props) {
  let tasks = _.map(props.tasks, (task) => <Task key={"task" + task.id} task={task} users={props.users} session={props.session} />);
  return <div>
    <Link to='/new_task' onClick={() => api.hide_flash()}disabled={!props.session}><button className="btn btn-primary" disabled={!props.session}>Create a new task</button></Link>

    <div className="card-columns" style={{"columnCount": 3}}>
      {tasks}
    </div>
  </div>;
}

function Task(props) {
  let {task, users, session} = props;
  let filtered_users = _.filter(users, (user) => user.name != task.user_name)
  let user_options = _.map(filtered_users, (user) =>
    <button className="dropdown-item" type="button" key={`task${task.id}_dropdown_user${user.id}`}
        onClick={() => api.update_task_user(task.id, user.id, session.token)}>
      {user.name}
    </button>
  );

  let isMine = (!session || session.user_name != task.user_name)

  return <div className="card">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">{task.description}</p>
    </div>
    <div className="card-body">
      <p>Time:</p>
      <div className="row">
        <button className="btn btn-red btn-pluss" type="button" onClick={() => api.increment_task_time(task.id, task.time, session.token)} disabled={isMine} >+</button>
        <p className="btn">{task.time}</p>
        <button className="btn btn-red btn-pluss" type="button" onClick={() => api.decrement_task_time(task.id, task.time, session.token)} disabled={isMine || task.time < 15} >-</button>
      </div>

      <p className="card-text">Assigned to:</p>
      <div className="btn-group">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={!session}>
          {task.user_name}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          {user_options}
        </div>
      </div>

    </div>

    <div className="card-body">
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="form-check-input custom-control-input" id={`customCheck${task.id}`} checked={task.completed} onChange={() => api.complete_task(task.id, !task.completed, session.token)} disabled={isMine} />
        <label className="custom-control-label" htmlFor={`customCheck${task.id}`}>Mark as Completed</label>
      </div>
    </div>

    <div className="card-body">
      <Link to={`/tasks/${task.id}`} disabled={isMine} onClick={() => api.hide_flash()}><button className="btn btn-primary" disabled={isMine} >Edit task</button></Link>
      <button className="btn btn-danger" onClick={() => api.delete_task(task.id, session.token)} disabled={isMine} >Delete</button>
    </div>
  </div>;
}

function state2props(state) {
  return {
    tasks: state.tasks,
    users: state.users,
    session: state.session,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);
