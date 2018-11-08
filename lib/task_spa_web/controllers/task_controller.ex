defmodule TaskSpaWeb.TaskController do
  use TaskSpaWeb, :controller

  alias TaskSpa.Tasks
  alias TaskSpa.Tasks.Task

  action_fallback TaskSpaWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token}) do
    case Phoenix.Token.verify(TaskSpaWeb.Endpoint, "user_id", token) do
      {:ok, _} ->
        with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
          task = Tasks.get_task!(task.id)
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.task_path(conn, :show, task))
          |> render("show.json", task: task)
        end
      _ ->
        conn
        |> render("show.json")
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "token" => token}) do
    task = Tasks.get_task!(id)
    case Phoenix.Token.verify(TaskSpaWeb.Endpoint, "user_id", token) do
      {:ok, _} ->
        with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
          # Reloads the task to get the updated associations
          task = Tasks.get_task!(id)
          render(conn, "show.json", task: task)
        end
      _ -> render(conn, "show.json")
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    task = Tasks.get_task!(id)
    case Phoenix.Token.verify(TaskSpaWeb.Endpoint, "user_id", token) do
      {:ok, _} ->
        with {:ok, %Task{}} <- Tasks.delete_task(task) do
          send_resp(conn, :no_content, "")
        end
      _ -> render(conn, "show.json")
      end
  end
end
