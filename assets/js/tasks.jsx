import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import api from './api';
import "bootstrap";

function TaskList(props) {
  let tasks = _.map(props.tasks, (task) => <Task key={"task" + task.id} task={task} />);
  return <div className="row">
    {tasks}
  </div>;
}

function Task(props) {
  let {task} = props;

  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">{task.description} <br/>
                               Time: {task.time}</p>
      <button className="btn btn-red btn-pluss" type="button" onClick={() => api.increment_task_time(task.id, task.time)} >+</button>
      <button className="btn btn-red btn-pluss" type="button" onClick={() => api.decrement_task_time(task.id, task.time)} >-</button>
      <p className="card-text">Assigned to:<br/>{task.user_name}</p>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">Something else here</button>
        </div>
      </div>
    </div>
    <div className="card-body">
      <p>Mark as completed</p>
      <input type="checkbox" checked={task.completed}
          onChange={() => api.complete_task(task.id, !task.completed)} />
    </div>
    <div className="card-body">
      <button>Edit task</button>
    </div>
  </div>;
}

function state2props(state) {
  return {
    tasks: state.tasks,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);
