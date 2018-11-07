defmodule TaskSpaWeb.Router do
  use TaskSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskSpaWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks", PageController, :index
  end

  scope "/api/v1", TaskSpaWeb do
    pipe_through :api

    resources "/sessions", SessionController, only: [:create, :delete]

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController
  end
end
