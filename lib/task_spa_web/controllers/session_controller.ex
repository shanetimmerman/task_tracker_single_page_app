defmodule TaskSpaWeb.SessionController do
    use TaskSpaWeb, :controller

    action_fallback TaskSpaWeb.FallbackController

    alias TaskSpa.Users.User

    def create(conn, %{"name" => name, "password" => password}) do
      case TaskSpa.Users.get_and_auth_user(name, password) do
        %User{} = user ->
          resp = %{
            data: %{
              token: Phoenix.Token.sign(TaskSpaWeb.Endpoint, "user_id", user.id),
              user_id: user.id,
              user_name: user.name,
            }
          }

          conn
          |> put_resp_header("content-type", "application/json; charset=UTF-8")
          |> send_resp(:created, Jason.encode!(resp))
        _ ->
          conn
          |> send_resp(:unauthorized, Jason.encode!("Login failed"))
      end
    end

    def delete(conn, _params) do
      send_resp(conn, :no_content, "")
    end
  end
