defmodule TaskSpaWeb.TaskView do
  use TaskSpaWeb, :view
  alias TaskSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      name: task.name,
      description: task.description,
      completed: task.completed,
      time: task.time,
      user_name: task.user.name
    }
  end
end
