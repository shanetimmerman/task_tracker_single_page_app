import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import api from './api';

function Header(props) {
    let {session, flash} = props

    function handleSubmit(event) {
        event.preventDefault();
        let name = event.target[0].value;
        let password = event.target[1].value;

        api.create_session(name, password);
        return false;
    }

    let login;

    if (session) {
        login =
            <div>
                <p className="text-muted btn">Logged in as {session.user_name}</p>
                <button className="btn btn-secondary"
                    onClick={() => api.delete_session()}>Logout</button>
            </div>
    } else {
        login =
            <form className="form-inline" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <div className="form-group" >
                    <button type="submit" className="btn btn-default btn-secondary" >Login</button>
                    <Link className="btn btn-default btn-info" to="/new_user" onClick={() => api.hide_flash()} >Register</Link>
                </div>
            </form>
    }
    return <div>
        <Alert color="danger" isOpen={flash.visible} toggle={() => api.hide_flash()}>
            {flash.message}
        </Alert>
        <div className="row my-2">
            <div className="col-4">
                <h1><Link to="/" onClick={() => {
                    api.fetch_tasks();
                    api.hide_flash();
                }}>
                    Task Tracker</Link></h1>
            </div>
            <div className="col-6">
                {login}
            </div>
        </div>
    </div>;
}

function state2props(state) {
    return {
      session: state.session,
      flash: state.flash,
    };
  }

// Export result of curried function call.
export default connect(state2props)(Header);
