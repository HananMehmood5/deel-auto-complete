# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Project has covered all the requirements mentioned in `Deel - Home Assignment` document.

`AutoComplete` is designed and developed supporting all the possible cases:

- There is no query, So there is no data -> Handled ✅
- There is query, buy there is loading state -> Handled ✅
- Fetch request has returned data -> Handled ✅
- Fetch request has returned no data -> Handled ✅
- Fetch request has returned error -> Handled ✅

Besides it, it is done efficiently by

- Using the debounce approach saving network requests
- Using extensible and scale-able code patterns

Further, it is provided good UX by:

- Enabling Keyboard navigation
- Highlighting the query term in the list and handling all the cases
- Mobile first approach in design

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
`AutoComplete` is covered with the test coverage.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
