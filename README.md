# Project 6
## Studious

Please be sure to look at our [DOCS](./docs/README.md) for a more thorough explanation of how everything is wired together!

Also, please note that [@kylekthompson](https://github.com/kylekthompson)'s line additions should be about -2700 because he ran `rails new studious` and `create-react-app`.

## Setup

### On Ubuntu
```bash
./bin/setup
```

### On macOS
```bash
npm install
bundle install
rake db:create && rake db:schema:load
```

## Start the dev server
```bash
./bin/server
```

Then head to [localhost:5100](http://localhost:5100) and get studious

### Roles
* Overall Project Manager: Kyle Thompson [@kylekthompson](https://github.com/kylekthompson)
* Coding Manager: Alex Tareshawty [@atareshawty](https://github.com/atareshawty)
* Testing Manager: Sean Whitehurst [@seanpwhitehurst](https://github.com/seanpwhitehurst)
* Documentation: Mary Zhou [@mz43065](https://github.com/mz43065)

### Contributions

- Joel Diener
  - `CoursesController` implementation and tests
  - `FlashCardsController` implementation and tests
  - Paired with Mary on `LandingPage.jsx` and `Message.jsx`
- Alex Tareshawty
  - Some work in `ChatChannel` Action Cable
  - `CourseUsersController` implementation and tests
  - Some work in API views
  - Responsible for and implemented the majority of the client-side React application
  - Responsible for and implemented the majority of the Redux state
- Kyle Thompson
  - `UsersController` implementation and tests
  - All model tests
  - Some work in `ChatChannel` Action Cable
  - Implemented some React components
  - Worked with some of the Redux state
  - Probably bought [@atareshawty](https://github.com/atareshawty) ice cream at some point
- Sean Whitehurst
  - `MembershipsController` implementation and tests
  - `StudyGroupsController` implementation and tests
  - Designed client side chat
  - Responsible for design choices
- Mary Zhou
  - `FlashCardSetsController` implementation and tests
  - Paired with Joel on `LandingPage.jsx` and `Message.jsx`
