defmodule TaskSpaWeb.PageController do
  use TaskSpaWeb, :controller

  def index(conn, _params) do
    tasks = TaskSpa.Tasks.list_tasks()
    |> Enum.map(&show_task/1)
    render conn, "index.html", tasks: tasks
  end

  def show_task(task) do
    user_name = task.user.name
    task
    |> Map.take([:name, :description, :completed])
    |> Map.put(:user_name, user_name)
  end
end
