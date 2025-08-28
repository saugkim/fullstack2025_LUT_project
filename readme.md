# Adding Editing/updating deleting notes and fetching nodes by logged-in user

My project is built on top of the Brad's MERN authentiation starter project below.
My app includes the following in addition to the Brad's MERN authentication base work. 

 - React fronted to Create-Read-Update-Delete note for logged-in user
 - two different views for note collection 
        - route for simple list of notes (all notes, one line each note) and create new one
        - route for detail of the note (single note) - edit, update & delete    


# MERN Authentication Starter

SPA (Single Page Application) for authentication is based off of [MERN Stack From Scratch | eCommerce](https://www.traversymedia.com/mern-stack-from-scratch) course.

It includes the following:

- Backend API with Express & MongoDB
- Routes for auth, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React & Redux toolkit & Vite build tool for frontend to register, login, logout, view profile, and update profile
- React Bootstrap UI library


## File structure

```
NOTE APP
├── readme.md
├── package.json
├── package-lock.json
├── .gitignore
├── .env
├── server.js
├── testing.http (extension REST-client)
│
├── node_modules
│       └── //
│
├── backend
│       ├── config
│       │       └── db.js
│       ├── controllers 
│       │       ├── noteController.js
│       │       └── userController.js
│       │                   
│       ├── middleware
│       │       ├── asyncHandler.js
│       │       ├── authMiddleware.js
│       │       ├── checkObjectId.js
│       │       └── errorMiddleward.js
│       ├── models 
│       │       ├── noteModels.js
│       │       └── userModels.js
│       ├── routes 
│       │       ├── noteRoutes.js
│       │       └── userRoutes.js
│       └── utils 
│               └── generateToken.js
│
└── frontend
        ├── vite.config.js
        ├── package.json 
        ├── package-lock.json
        ├── eslintrc.cjs
        ├── index.html
        ├── node_modules (frontend)
        │       └── //
        │
        ├── public
        │       ├── screen.png
        │       └── vite.svg
        │                   
        └────  src
                ├── App.jsx
                ├── index.css
                ├── main.jsx
                ├── store.js
                ├── assets -react.svg
                ├── components
                │       ├── FormContainer.jsx   
                │       ├── Header.jsx
                │       ├── Loader.jsx
                │       ├── Intro.jsx
                │       └── PrivateRoute.js
                ├── screens
                │       ├── HomeScreen.jsx   
                │       ├── LoginScreen.jsx
                │       ├── ProfileScreen.jsx
                │       ├── RegisterScreen.jsx
                │       ├── NotesScreen.jsx
                │       └── SingleNoteScreen.jsx
                └── sllices
                        ├── apiSlice.js   
                        ├── authSlice.js
                        ├── notesApiSlice.js
                        ├── notesSlice.js
                        └── userApiSlice.js

```    


## Required MongoDB account

- Create a MongoDB database and obtain your `MongoDB URI` [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)


### Install 

```
npm install
cd frontend
npm install
```

### Run

```
# Run both frontend (localhost:3000) & backend (localhost:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

```
# Create frontend prod build
cd frontend
npm run build
```
