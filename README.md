# React Dashboard App
This project is a React dashboard application created using Create React App. It is designed to demonstrate my front-end development skills by utilizing React, Material-UI, and Tailwind CSS libraries. The application fetches data from JSONPlaceholder, showcasing it in various sections, including an initial page and a dashboard with a user table, articles list, and albums page.


## Table of Contents
 - Getting Started
 - Available Scripts
 - Package.json and Webpack Configuration


### Getting Started
To explore this project and see it in action, follow these steps:

1. Clone the repository to your local machine: <br>
```sh
    git clone <repository-url>
```

2. Navigate to the project directory: <br>
```sh
    cd <project-directory>
```

3. Install the required dependencies: <br>
```sh
    npm install
```

4. Start the development server:
```sh
    npm run serve
```

5. Open your web browser and go to `http://localhost:8080` to view the app.

The development server will automatically reload when you make changes, and any lint errors will be displayed in the console.


### Available Scripts
In the project directory, you can run the following scripts:

- `npm run serve` <br>
Runs the app in development mode.
Open `http://localhost:8080` to view it in your browser. The page will automatically reload when you make changes, and you can check for lint errors in the console.

- `npm run build` <br>
Builds the app for production in the `dist` folder. This process correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes, making your app ready for deployment. See the deployment section for more information.

- `npm run watch` <br>
Watches for changes in your source code and automatically triggers the build process when modifications are detected. This is particularly useful during development as it ensures that your app stays up to date with the latest changes without manually triggering the build process. Simply run this command, and it will keep an eye on your code, updating the build as needed.


### Package.json and Webpack Configuration
Here's the `package.json` and Webpack configuration for this project:
```json
    {
        "name": "posts-spa",
        "version": "0.1.0",
        "private": true,
        "dependencies": {
            // Add your dependencies here
        },
        "scripts": {
            "build": "webpack",
            "watch": "webpack --watch",
            "serve": "webpack serve"
        },
        // Add other configurations as needed
    }
```

Webpack Configuration:
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const modes = {
    development: 'development',
    production: 'production'
}

module.exports = {
    // Add your Webpack configuration here
}
```

Make sure to add your actual dependencies and additional configuration as per your project requirements.

Feel free to explore the main dashboard and make any modifications or improvements to suit your specific needs. Good luck with your job application!

