import store from './store';

class TheServer {
	// Sends request to the server, calls callback on the response
	send_to_server(path, command_type, data, callback) {
		$.ajax(path, {
			method: command_type,
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(data),
			success: callback,
		  });
	}

	// Helper for sending get requests
	send_get(path, callback) {
		this.send_to_server(path, "get", "", callback);
	}

	// Helper for sending post requests
	send_post(path, data, callback) {
		this.send_to_server(path, "post", data, callback);
	}

	// Helper for sending delete requests
	send_delete(path, data, callback) {
		this.send_to_server(path, "delete", data, callback)
	}

	// Helper for sending put requests
	send_put(path, data, callback) {
		this.send_to_server(path, "put", data, callback)
	}
	
	// Helper for sending get requests and dispatching response to store
	fetch_and_dispatch(path, type) {
		this.send_get(
			path, 
			(resp) => {
				store.dispatch({
					type: type,
					data: resp.data,
				});
			});
		}

	update_task(task_id, data) {
		this.send_put(`/api/v1/tasks/${task_id}`, 
					  {task: data},
					  (resp) => {
						  store.dispatch({
							  type: 'UPDATE_TASK',
							  data: resp.data,
						  })
					  })
	}

	update_task(task_id, data) {
		this.send_put(`/api/v1/tasks/${task_id}`, 
					  {task: data},
					  (resp) => {
						  store.dispatch({
							  type: 'UPDATE_TASK',
							  data: resp.data,
						  })
					  })
	}
		
	// Gets all the tasks
	fetch_tasks() {
		this.fetch_and_dispatch("/api/v1/tasks", 'TASK_LIST');
	}

	// Gets all the users
	fetch_users() {
		this.fetch_and_dispatch("/api/v1/users",'USER_LIST');
	}

	// Creates a session
	create_session(name, password) {
		this.send_post(
			"/api/v1/sessions",
			{ name, password },
			(resp) => {
				store.dispatch({
					type: 'NEW_SESSION',
					data: resp.data,
				});
			}
		);
	}

	// Deletes the users 
	delete_session() {
		this.send_delete(
			"/api/v1/sessions/1",
			"",
			(_resp) => {
				store.dispatch({
					type: "DELETE_SESSION"
				})
			}
		);
	}

	// Updates the completed field of the task
	complete_task(task_id, completed) {
		this.update_task(task_id, {completed: completed});
	}

	// Sets the task time to the given number
	update_task_time(task_id, time) {
		this.update_task(task_id, {time: time});
	}

	// Increments task time by step
	increment_task_time(task_id, time) {
		this.update_task_time(task_id, time + 15);
	}

	// Decrements task time by step
	decrement_task_time(task_id, time) {
		this.update_task_time(task_id, Math.max(0, time - 15));
	}

	// Changes the user the task is assigned to
	update_task_user(task_id, user_id) {
		this.update_task(task_id, {user_id: user_id});
	}

	// Deletes the task
	delete_task(task_id) {
		this.send_delete(
			`/api/v1/tasks/${task_id}`,
			"",
			(resp) => {
				store.dispatch({
					type: "DELETE_TASK",
					data: {task_id: task_id},
				});
			}
		)
	}

	// Register a new user
	create_user(username, password) {
		this.send_post("/api/v1/users",
					   {user: {name: username, password: password}},
					   null,
		);

		this.create_session(username, password);
		
		this.fetch_users();
	}

	// Store the form for creating a task
	update_new_task_form(key, value) {
		store.dispatch({
			type: "UPDATE_NEW_TASK_FORM",
			data: {key: key, 
				   value: value},
		})
	}

	create_task(name, desc, user_id) {
		this.send_post(
			"/api/v1/tasks",
			{task : {
				name: name,
				description: desc,
				user_id: user_id,}},
			store.dispatch({
				type: "CLEAR_NEW_TASK_FORM"
			})
		);
		this.fetch_tasks();
	}
}

export default new TheServer();