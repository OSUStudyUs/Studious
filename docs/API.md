# API Side!

On the backend, Studious is a super-modern-buzzword-friendly Rails 5 application using some of [@DHH](https://github.com/dhh)'s cool new features.
Some of these features include [API-only mode](http://edgeguides.rubyonrails.org/api_app.html) and [Action Cable](http://edgeguides.rubyonrails.org/action_cable_overview.html) (we'll go into detail on these a little later).

TL;DR: The Rails application spits out and accepts JSON to/from the ReactJS client.

## API-only mode

From DHH's [PR](https://github.com/rails/rails/pull/19832):
>The original idea behind Rails API was to serve as a starting point for a version of Rails better suited for JS-heavy apps. As of today, Rails API provides: trimmed down controllers and middleware stack together with a matching set of generators, all specifically tailored for API type applications."

## Action Cable

From [Action Cable's README](https://github.com/rails/rails/blob/master/actioncable/README.md):
>Action Cable seamlessly integrates WebSockets with the rest of your Rails application. It allows for real-time features to be written in Ruby in the same style and form as the rest of your Rails application, while still being performant and scalable. It's a full-stack offering that provides both a client-side JavaScript framework and a server-side Ruby framework. You have access to your full domain model written with Active Record or your ORM of choice.

## Folder Structure

The folder structure of the API side is very similar to your standard Rails 4.2 application with a few exceptions:
- The addition of the `channels` folder
- Namespaced controllers (`Api::*Controller` as opposed to `*Controller`)
  - Note that the controllers are also inside of an `api` folder
- Namespaced views to match the controller namespacing
- Views are written in with the [JBuilder DSL](https://github.com/rails/jbuilder/blob/master/README.md)
  - This is because we want to render JSON instead of HTML
- We have a `spec` folder because we are using [RSpec](http://rspec.info/)
  - Note the `factories` folder inside of the `spec` folder; this folder hold our [FactoryGirl](https://github.com/thoughtbot/factory_girl/blob/master/README.md) factories for easy test model generation

```js
studious/
+-- app/
|   +-- channels/
|   |   +-- chat_channel.rb
|   +-- controllers/
|   |   +-- api/
|   |   |   +-- *_controller.rb
|   |   +-- index_controller.rb
|   +-- views/
|   |   +-- api/
|   |   |   +-- */
|   |   |   |   +-- *.json.jbuilder
+-- spec/
|   +-- controllers/
|   |   +-- api/
|   |   |   +-- *_controller_spec.rb
|   +-- factories/
|   |   +-- *.rb
|   +-- models/
|   |   +-- *_spec.rb
```

### `app/`

#### `channels/chat_channel.rb`

This is the Action Cable implementation for chat through WebSockets. It provides a two-way connection between the client and server to send and receive messages.

#### `controllers/api/*_controller.rb`

These are our namespaced API controllers that render JSON.

#### `controllers/index_controller.rb`

This controller serves the built `index.html` file from our client side in production.

#### `views/api/*/*.json.jbuilder`

These are the JSON views written with the JBuilder DSL mentioned earlier (the controllers render these).

### `spec/`

#### `controllers/api/*_controller_spec.rb`

These are the RSpec tests for our API controllers.

#### `factories/*.rb`

These are the FactoryGirl factories used to generate sample data for our tests.

#### `models/*_spec.rb`

These are the RSpec tests for our models.

## _wipes brow_

Phew! There is a lot going on there. Luckily, Rails handles a lot of the heavy lifting for us! All we need to worry about is following the convention that's set in place now.
