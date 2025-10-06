# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Vir ons om te onboard
This is a React application folder structure created by Create React App. Here's what each file/folder does:
📁 node_modules/

Contains all installed npm packages and dependencies
Created when you run npm install
Should be in .gitignore (not committed to version control)

📁 public/

Static files that don't go through the build process
Contains index.html (the single HTML page for your React app)
Images, favicons, manifest files that need direct access

📁 src/ (Source code - where you write your app)
Core Files:

App.css - Styles for the App component
App.js - Main React component (your app starts here)
App.test.js - Unit tests for App component
index.css - Global styles for the entire app
index.js - Entry point - renders App into the DOM
logo.svg - React logo (default, can be deleted)
reportWebVitals.js - Performance monitoring (optional)
setupTests.js - Configuration for testing library

📄 Root Files:

.gitignore - Tells Git which files to ignore (node_modules, build, etc.)
package-lock.json - Locks exact versions of dependencies
package.json - Project configuration, dependencies, scripts
README.md - Project documentation

🔄 How it flows:
index.html (public/)
    ↓
index.js (src/) 
    ↓
App.js (src/)
    ↓
Your components

public/index.html has a <div id="root">
src/index.js finds that div and renders...
src/App.js (your main component)
App.js renders your other components

💡 Where to work:

Add new components → src/ folder
Add images/styles → src/ folder (imported in components)
Static files → public/ folder (accessed via public URL)

This is the standard React structure - clean, simple, and ready to build upon! 🚀