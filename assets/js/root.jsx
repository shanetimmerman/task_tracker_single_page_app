import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';


export default function root_init(node) {
  ReactDOM.render(<Root tasks={window.tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
      session: null,
      modify_task_form: new Map(),
    };

    this.fetch_tasks();
    this.fetch_users();
  }

  fetch_tasks() {
    $.ajax("/api/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }

  fetch_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }

  create_session(name, password) {
    $.ajax("/api/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({name, password}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }

  render() {
    return <div>
      <Header />
      <TaskList tasks={this.state.tasks} />
    </div>;
  }
}

function Header(_props) {
  return <div className="row my-2">
    <div className="col-6">
      <h1>Task Tracker</h1>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="name" placeholder="name" />
        <input type="password" placeholder="password" />
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>;
}

function TaskList(props) {
  let prods = _.map(props.tasks, (p) => <Task key={p.id} task={p} />);
  return <div className="row">
    {prods}
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">{task.description} <br/>
      Time: {task.time}</p>
      <p className="card-text">Assigned to:<br/>{task.user_name}</p>
    </div>
  </div>;
}

