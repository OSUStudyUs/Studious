# Client Side!

Studious is a single page web application that makes use of some shiny new JavaScript libraries. We use
[React](https://facebook.github.io/react/) to build DOM elements with JavaScript. Since this app will have a lot of
state on the client side, we're using a popular state management library called [Redux](http://redux.js.org/). We'll
dig into those a little bit separately, then see how they combine to create some JavaScript goodness. Also, pretty please read some of the documentation for both of these libraries before diving in to the UI code. It's kind of overwhelming to just be thrown into it without reading any documentation (trust me, I've been there before).

**Note: We're heavily using the ECMA 2015 (ES6) specification of JavaScript. If there is some weird syntax you don't
recognize, it's that. If you can't figure out what it does, ask @atareshawty because it was probably him being lazy and
using shorthand. Here's a really good [resource](https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620#.7027v1dkf) for learning ECMA2015**

**Second Note: we're also using a combination of jsx and js. For our purposed, you can think of jsx as javascript with some HTML like syntax. Most people prefer to build React apps with jsx files**

## React

"A JavaScript library for building user interfaces" (from their docs).
In broad terms, React is a declarative library that allows you to build DOM elements painlessly.

## Redux

"Redux is a predictable state container for JavaScript apps" (from their docs). Redux is build on one simple concept.
The state is the single source of truth for state (data) of the app. In a nutshell, you can read from the state to
render the appropriate DOM elements. You can edit the state by emitting `actions`. An action has a `type` and a `payload`.
`Reducers` are functions that take the current state, and an action. If the reducer is 'listening' (not event listeners)
to a certain action, they'll look at the payload and return the appropriate next state based on the action's payload. That's it! This library is crazy popular to use with React, but it can be used anywhere. To see how we're using it, play
particular attention to this [doc page](http://redux.js.org/docs/basics/UsageWithReact.html)

## Folder Structure

All of the UI code is in `./client`. The meat of the app is in `./client/src`. We'll take a look there. This file structure is based on the [Ducks spec](https://github.com/erikras/ducks-modular-redux).

```js

src/
+-- feature
|   +-- components
|       +-- *.jsx
|       +-- *.scss
|   +-- actions.js
|   +-- constants.js
|   +-- index.js
|   +-- reducer.js
|   +-- selector.js
+-- utils
|   +-- api.js
|   +-- index.js
|   +-- others...
+-- shared_components
|   +-- *.jsx
|   +-- *.scss
+-- App.css
+-- App.jsx
+-- index.css
+-- index.js
+-- root_reducer.js
```

### feature

Each Feature will mostly reflect some model of our db schema. In there you'll find the corresponding reducer, actions, constants, and components related to that feature.

### utils

Just come helpers functions that can be used throughout the app.

### shared_components

React components that aren't related to any feature, but are reusable and can be shared by feature components.

### App.jsx

That's where the magic happens. There, the outermost structure of our DOM is declared. It handles all routing.

### index.js

This is where App.jsx actually gets rendered. It combines all the redux stuff and attaches our React app to the root element of our app (defined in `./client/public/index.html`)

## Simple, isn't it?

I know this is a lot to wrap your head around. This seems like a lot of overhead compared to what we've done with
JavaScript so far. I promise, with all the UI goodness we want our app to have, we'll be glad to have something
like this structure to manage everything. Once you get familiar with things, new features are incredibly easy
(and fun :tada: ) to implement. If you've read some docs and still feel uncomfortable with things, please please please
ask me. React is a lot of fun to write and you can build some really rich UIs with it.
