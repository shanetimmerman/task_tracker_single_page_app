import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import api from './api';
import { Redirect, Link } from 'react-router-dom';


function TaskList(props) {
  let tasks = _.map(props.tasks, (task) => <Task key={"task" + task.id} task={task} users={props.users} session={props.session} />);
  return <div> 
    <div className="card-columns" style={{"columnCount": 3}}>
      {tasks}
    </div>
  
    <p><Link className="btn btn-primary" to='/new_task' disabled={!props.session}>Create task</Link></p>
  </div>;
}

function Task(props) {
  let {task, users, session} = props;
  let filtered_users = _.filter(users, (user) => user.name != task.user_name)
  let user_options = _.map(filtered_users, (user) =>
    <button className="dropdown-item" type="button" key={`task${task.id}_dropdown_user${user.id}`} 
        onClick={() => api.update_task_user(task.id, user.id)}>
      {user.name}
    </button>
  );
  
  let isMine = (!session || session.user_name != task.user_name)

  return <div className="card">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">{task.description} <br/>
                               Time: {task.time}</p>
      <button className="btn btn-red btn-pluss" type="button" onClick={() => api.increment_task_time(task.id, task.time)} disabled={isMine} >+</button>
      <button className="btn btn-red btn-pluss" type="button" onClick={() => api.decrement_task_time(task.id, task.time)} disabled={isMine} >-</button>
      
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
      <p>Mark as completed</p>
      <input type="checkbox" checked={task.completed} onChange={() => api.complete_task(task.id, !task.completed)} disabled={isMine} />
    </div>

    <div className="card-body">
      <button className="btn btn-primary" disabled={isMine} >Edit task</button>
      <button className="btn btn-danger" onClick={() => api.delete_task(task.id)} disabled={isMine} >Delete</button>
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
