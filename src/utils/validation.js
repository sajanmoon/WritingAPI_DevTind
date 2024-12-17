const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("feilds are empty");
  } else if (firstName.length < 4 && firstName.length > 50) {
    throw new Error("Name not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("email not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password not valid");
  }
};
module.exports = { validationSignUpData };
