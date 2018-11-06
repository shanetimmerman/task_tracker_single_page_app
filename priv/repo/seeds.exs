# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskSpa.Repo.insert!(%TaskSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskSpa.Repo
alias TaskSpa.Users.User
alias TaskSpa.Tasks.Task

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{name: "alice", password_hash: pwhash})
Repo.insert!(%User{name: "bob", password_hash: pwhash})

Repo.insert!(%Task{name: "Rubber Duck", description: "Yellow",
                      completed: false, time: 15, user_id: 1})
Repo.insert!(%Task{name: "Bear", description: "500lbs; angry",
                      completed: false, time: 30, user_id: 2})
Repo.insert!(%Task{name: "Cookie", description: "chocolate oatmeal",
                          completed: false, time: 45, user_id: 1})
Repo.insert!(%Task{name: "Donut", description: "chocolate frosted",
                          completed: false, time: 60, user_id: 2})
