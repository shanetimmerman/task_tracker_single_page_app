defmodule TaskSpa.Repo do
  use Ecto.Repo,
    otp_app: :task_spa,
    adapter: Ecto.Adapters.Postgres
end
