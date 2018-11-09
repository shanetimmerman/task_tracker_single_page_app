import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

import api from './api';

function EditTaskForm(props) {
  let { users, tasks, dispatch, edit_task_form, session } = props;
  let id_num = parseInt(window.location.pathname.substring("/tasks/".length));

  let task = tasks.find((task) => task.id == id_num);

  if (!session) {
    api.show_flash('Please sign-in')
    return <Redirect to={"/"} />
  }

  if ($.isEmptyObject(edit_task_form) || edit_task_form.id != task.id) {
    let action = {
      type: "LOAD_FORM_FROM_TASK",
      data: task,
    }
    dispatch(action);
  }

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    api.update_task(
      task.id,
      edit_task_form,
      session.token
    );
    return false;
  }

  function dispatchHelper(key, value) {
    let action = {
      type: "UPDATE_EDIT_TASK_FORM",
      data: {
        key: key,
        value: value
      },
    }
    dispatch(action);
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
        onChange={(ev) => dispatchHelper("name", ev.target.value)}
        value={edit_task_form.name} />
    </div>

    <div className="form-group row">
      <label>Description</label>
      <textarea type="doc" className="form-control" id="new-task-desc"
        onChange={(ev) => dispatchHelper("description", ev.target.value)}
        value={edit_task_form.description} />
    </div>

    <div className="form-group">
      <label>Assigned to:</label>
      <div className="btn-group">
        <button type="button" className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            disabled={!session}>
          { edit_task_form.user_name }
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          {user_options}
        </div>
      </div>
    </div>

    <div className="form-group">
      <div className="row">
        <button className="btn btn-red btn-pluss" type="button" onClick={() => dispatchHelper("time", edit_task_form.time + 15)}>+</button>
        <p className="btn">{edit_task_form.time }</p>
        {/* <button className="btn btn-red btn-pluss" type="button" onClick={() => api.decrement_task_time(task.id, task.time, session.token)} disabled={task.time < 15} >-</button> */}
        <button className="btn btn-red btn-pluss" type="button" onClick={() => dispatchHelper("time", Math.max(edit_task_form.time - 15, 0))} disabled={edit_task_form.time < 15} >-</button>

      </div>
    </div>

    <div className="card-body">
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="form-check-input custom-control-input"
            id={`customCheckEditTaskPage${task.id}`}
            checked={edit_task_form.completed}
            onChange={() => dispatchHelper("completed", !edit_task_form.completed)} />
        <label className="custom-control-label" htmlFor={`customCheckEditTaskPage${task.id}`}>
          Mark as Completed
        </label>
      </div>
    </div>

    <div className="row container-fluid">
      <Link to="/" onClick={() => {
          handleSubmit();
          api.hide_flash();
        }}
        className="btn btn-secondary" >Submit</Link>

        <Link to="/" onClick={() => {
          api.fetch_tasks();
          api.clear_edit_task_form();
          api.hide_flash();
        }}
            className="btn btn-danger">Cancel</Link>
    </div>



  </form>
}

function state2props(state) {
  return {
    session: state.session,
    users: state.users,
    tasks: state.tasks,
    edit_task_form: state.edit_task_form,
  };
}

export default connect(state2props)(EditTaskForm);
// Export result of curried function call.
