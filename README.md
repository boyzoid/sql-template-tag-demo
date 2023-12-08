# SQL Template Tag Demo

This projects contains basic example of using [SQL Template Tag](https://github.com/blakeembrey/sql-template-tag).

## Getting Started

* Log into a MySQL server and create a schema named `sql_template_tag_demo` and run the `/data/users.sql` script.
* Run `npm install` to install the Node modules.
* Copy `.env.template` to `.env` and update the values to match your credentials.
* Start the app with the command `node src`.
* Make a http request to `http://localhost:3000` to check that the app is working.

## Included endpoints

* `/unsafe/:id` - This is an example of how NOT to handle user input in a query.
* `/safe/:id` - This is an example of parameterizing a MySQL query with user input
* `/easier/:id` - This is an example of using SQL Template tage and template literals to generate a parameterized query and handle the parameters all in one step./
