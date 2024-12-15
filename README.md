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
