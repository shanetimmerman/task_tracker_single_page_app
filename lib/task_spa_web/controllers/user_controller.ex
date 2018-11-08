defmodule TaskSpaWeb.UserController do
  use TaskSpaWeb, :controller

  alias TaskSpa.Users
  alias TaskSpa.Users.User

  action_fallback TaskSpaWeb.FallbackController


  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    user_params = Map.put(user_params,
                          "password_hash",
                          Argon2.hash_pwd_salt(Map.get(user_params, "password")))
    |> Map.delete("password")
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params, "token" => token}) do
    user = Users.get_user!(id)
    case Phoenix.Token.verify(TaskSpaWeb.Endpoint, "user_id", token) do
      {:ok, _} ->
        with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
          render(conn, "show.json", user: user)
        end
      _ -> render(conn, "show.json", user: user)
      end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
