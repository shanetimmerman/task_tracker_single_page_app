defmodule TaskSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    field :password_hash, :string

    has_many :tasks, TaskSpa.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password_hash])
    |> unique_constraint(:name)
    |> validate_required([:name, :password_hash])
  end
end
