# Writing API

# SETUP

- Create routes folder > user.js file
- Import express
- Import models(Schemas)
- Import Router (const authRouter = express.Router();)
- Export Router (module.exports = authRouter;)

# SIGNUP API

- create a POST signup router
- to take a dynamic inputs we will
- Will now create a new instance of User model
- Declare a user, then new User (Models)
- With the req.body we will be able to take input of all models feild we created
- we will save the user (user.save())
- after signup will send a response res.send("....")
- <img src="./images/signupAPI.png" alt="Logo" width="600">

# FIND USER BY EMAIL

- Create a GET user API route
- declare a const userEmail to store email from req.body.email
- with the help of find method pass {email:userEmail}
- <img src="./images/userAPI.png" alt="Logo" width="600">
-

# FEED API

- Create a GET feed API route
- Just use the find method and pass empty object {}
- <img src="./images/feedAPI.png" alt="Logo" width="600">

# DELETE API

- <img src="./images/DeleteAPI.png" alt="Logo" width="600">

# UPDATE API with id

- <img src="./images/UpdateById.png" alt="Logo" width="600">

# UPDATE API with email

- <img src="./images/updatebyemail.png" alt="Logo" width="600">

# VALIDATION ON SCHEMAS

- Make some feild mandatory with required:true (eg.firstName,email,password..etc)
- With same email there should not be 2 user, using unique:true
- default value, string etc explore all the documentation

- <img src="./images/validationschema.png" alt="Logo" width="600">

- VALIDATE method ,if in gender only value includes male female then write following code in gender schema
- <img src="./images/gendervalidatefeilds.png" alt="Logo" width="600">
- Works only when new instance is created
- if we want to work this on while updating in patch api we should add{ runvalidator:true} parameter

# SANITIZING API

# UPDATE API

- we will validate feild which should be updated
- to validate feild we will retrict req.body to which data should come for updates
- the following code to validate api

- <img src="./images/santitizeapi.png" alt="Logo" width="600">
