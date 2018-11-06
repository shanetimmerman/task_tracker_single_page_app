defmodule TaskSpaWeb.SessionController do
    use TaskSpaWeb, :controller
  
    action_fallback TaskSpaWeb.FallbackController
  
    alias TaskSpa.Users.User
  
    def create(conn, %{"name" => name, "password" => password}) do
      with %User{} = user <- TaskSpa.Users.get_and_auth_user(name, password) do
        resp = %{
          data: %{
            token: Phoenix.Token.sign(TaskSpaWeb.Endpoint, "user_id", user.id),
            user_id: user.id,
          }
        }
  
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      end
    end
  end