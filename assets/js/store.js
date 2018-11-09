import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import $ from 'jquery';

/*
  Application state layout
  {
    tasks: props.tasks, // List of Product
    users: [], // List of User
    cart: [], // List of CartItem
    session: null, // { token, user_id }
    add_item_forms: new Map(), // { product_id => count }
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASK_LIST':
    return action.data;
  case 'UPDATE_TASK':
    let state0 = state.slice(0);
    let index = state0.findIndex((task) => task.id == action.data.id);
    state0[index] = action.data;
    return state0;
  case 'DELETE_TASK':
    let state1 = _.filter(state, (task) => task.id != action.data.task_id);
    return state1;
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  case 'DELETE_SESSION':
    return null;
  default:
    return state;
  }
}

function new_task_form(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_NEW_TASK_FORM':
    let state1 = $.extend({}, state);
    state1[action.data.key] = action.data.value;
    return state1;
  case 'CLEAR_NEW_TASK_FORM':
    return {};
  default:
    return state;
  }
}

function edit_task_form(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_EDIT_TASK_FORM':
    let state1 = $.extend({}, state);
    state1[action.data.key] = action.data.value;
    return state1;
  case 'CLEAR_EDIT_TASK_FORM':
    return {};
  case 'LOAD_FORM_FROM_TASK':
    return $.extend({}, action.data);
  default:
    return state;
  }
}

function flash(state = {visible: false, message: ""}, action) {
  switch (action.type) {
  case 'HIDE_ERROR':
    let state0 = $.extend({}, state);
    state0.visible = false;
    return state0;
  case 'SHOW_ERROR':
    let state1 = $.extend({}, state);
    state1.visible = true;
    state1.message = action.data
    return state1;
  default:
    return state;
  }
}


function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, session, new_task_form, edit_task_form, flash});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
