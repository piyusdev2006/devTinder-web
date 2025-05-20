# devTinder-web Frontend

- create a vite + React application and start the development server
- Removes the unnecessary files from the project
- Install tailwind css and configure it 
- Install daisy Ui and configure it
- Add navbar component to App.jsx 
- create a Navbar.jsx seperate component file
- Install react-router-dom and configure it

- install react-router-dom
- create BrowserRouter, Routes, Route components
- create an outlet in your body component
- create Footer.jsx component


- component design
    Body
        Navbar
            Route = "/" --> feed
            Route = "/login" --> Login    
            Route = "/profile" --> Profile

- create Login component Login.jsx
- install axios to handle api call at frontend
- CORS : Install cors in backend and add middlewares with configration{
    origin: "http://localhost:5173"
    credentials: true
    optionsSuccessStatus: 200
}

- Whenever u are making an  api call to backend make sure to add {credentials: true} in axios ,if u don't pass the credentials it will not send back the token to other API calls and ur authentication will fail


## Break-time
- now we are going to implement how to redirect the used to dashboard after login
- Install redux toolkit npm install @reduxjs/toolkit and npm install react-redux
- create a store in src/utils/reduxStore.js file and configure it
- cerate a provider in root file and wrap the app inside it and also provide the store as a prop <Provider store={store}>
- add the reducers in reduxStore

- Install react redus and redux toolkit => create a store and configure it => create a provider and wrap the app inside it and provide the store as a prop

- Add redux devtools extension in the chrome browser
- Login and see if Your data is coming properly in the store
- Navbar component should update as soon as the user logs in
- Refactor the navbar component to use redux
- Refactor code to add constants in a separate file
- create a component folder and put all the components we have created inside it and also updates all the imports

- You should not be able to access other routes without logging in
- if token is not present in local storage then redirect to login page


<!-- Break Time -->
- Logout functionality
