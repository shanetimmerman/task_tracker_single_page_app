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
    get "/tasks", PageController, :index
    get "/new_user", PageController, :index
    get "/new_task", PageController, :index
  end

  scope "/api/v1", TaskSpaWeb do
    pipe_through :api

    resources "/sessions", SessionController, only: [:create, :delete]
    resources "/new_user", UserController, only: [:new]
    resources "/new_task", UserController, only: [:new]

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController

  end
end
