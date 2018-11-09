# Design Decisions

The tasks can be editted on the task viewing page, but only by changing their assigned user, changing the time worked, or marking as completed. Users cannot change any task that does not belong to them, but have the ability to reassign any task. Hypothetically, if one user assigns a task to another, they should have the ability to reassign that same task. This enables them to do that. Users can only delete tasks that belong to them.

Users change the time spent on a project using a plus or minus button. This ensures they do not enter an invalid time.

Users register with username instead of email. There is no reason to use an email instead of a username, so I decided to be more lenient with registration.

The new task form can be temporarily saved and returned to later.

There is no way to directly view all users. This seemed unnecessary, since there is no way to modify users, and the only important attribute about a user is there name. Users can be indirectly viewed in the dropdown list of users for a task.

Errors will be displayed in a flash message on top of the page.

# TaskSpa

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
