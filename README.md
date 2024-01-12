# React Dashboard App
Welcome to the Posts SPA – a dynamic React test application that serves as a captivating display of my front-end development skills. Immerse yourself in the seamless integration of cutting-edge technologies, including React, Material-UI, and Tailwind CSS.



## Table of Contents
 - [Getting Started](#getting-started)
 - [Available Scripts](#available-commands)



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

3. Create `.env` file:
```sh
    cp .example-env .env
```

4. Build the Docker container: <br>
```sh
    make build
```

5. Open your web browser and go to `http://localhost:3000` to view the app.

The development server will automatically reload when you make changes, and any lint errors will be displayed in the console.



### Available Commands
In the root directory, you can utilize the following 'make' commands to manage the Docker containers:

- `make up` <br>
Runs the Docker containers.

- `make down` <br>
Stops the Docker containers.

- `make bash` <br>
Opens a terminal inside the app container.

- `make build` <br>
Initiates Docker container building.

Inside the app's Docker container, you can run the following npm scripts:

- `npm start` <br>
Runs the app in development mode.
Open `http://localhost:3000` to view it in your browser. The page will automatically reload when you make changes, and you can check for lint errors in the console.

- `npm build` <br>
Builds the app for production in the `dist` folder. This process correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes, making your app ready for deployment.

- `npm run watch` <br>
Watches for changes in your source code and automatically triggers the build process when modifications are detected. This is particularly useful during development as it ensures that your app stays up to date with the latest changes without manually triggering the build process. Simply run this command, and it will keep an eye on your code, updating the build as needed.
