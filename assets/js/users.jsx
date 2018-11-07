import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';

import api from './api';

function UserList(props) {
  let users = _.map(props.users, (u) => <User key={u.id} user={u} />);
  return <table className="row">
    {users}
  </table>;
}

function User(props) {
  // return <p>Hello User</p>
  let {user} = props;
  return <p>{user.name}</p>;
}

function state2props(state) {
  console.log("rerender", state);
  return {
    users: state.users,
  };
}

// Export result of curried function call.
export default connect(state2props)(UserList);