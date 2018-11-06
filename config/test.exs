use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :task_spa, TaskSpaWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :task_spa, TaskSpa.Repo,
  username: "task_spa",
  password: "ahv6Su2Ceuc6",
  database: "task_spa_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
