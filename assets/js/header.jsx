import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import api from './api';

function Header(props) {
    let {session} = props
    let login;

    function handleSubmit(event) {
        event.preventDefault();
        let name = event.target[0].value;
        let password = event.target[1].value;
        
        api.create_session(name, password);
        return false;
    }

    if (session) {
        login = 
            <div>
                <p>Logged in as {session.user_name}</p>
                <button className="btn btn-secondary" 
                    onClick={() => api.delete_session()}>Logout</button>
            </div>    
    } else {
        login = 
            <form className="form-inline my-3" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="submit" className="btn btn-secondary" />
                <p><Link className="btn btn-info" to="/new_user" >Register</Link></p>
            </form>
    }
    return <div className="row my-2">
      <div className="col-4">
        <h1><Link to="/" onClick={() => api.fetch_tasks()}>Task Tracker</Link></h1>
      </div> 
      <div className="col-6">
        {login}
      </div>
    </div>;
}

function state2props(state) {
    console.log("rerender", state);
    return {
      session: state.session,
    };
  }

// Export result of curried function call.
export default connect(state2props)(Header);
