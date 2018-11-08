import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import api from './api';


function handleSubmit(event) {
  event.preventDefault();
  let username = event.target[0].value
  let pass1 = event.target[1].value
  let pass2 = event.target[2].value
  if (pass1 === pass2) {
    api.create_user(username, pass1);
  }
} 

function RegistrationForm(props) {
  if (props.session) {
    return <Redirect to="/" />
  };
  return <form onSubmit={handleSubmit}>      
      <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control"></input>
      </div>

      <div className="form-group">
        <label>Enter Password</label>
        <input type="password" className="form-control"></input>
      </div>
    
      <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" className="form-control"></input>
      </div>

    <div>
      <input type="submit" value="submit" className="btn btn-secondary" />
    </div>

  </form>
  }

function state2props(state) {
  return {
    session: state.session
  };
}

export default connect(state2props)(RegistrationForm);
// Export result of curried function call.