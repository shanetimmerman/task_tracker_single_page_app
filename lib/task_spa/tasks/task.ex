defmodule TaskSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :name, :string
    field :time, :integer, default: 0

    belongs_to :user, TaskSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :completed, :time, :user_id])
    |> validate_required([:name, :description, :completed, :time, :user_id])
  end
end
