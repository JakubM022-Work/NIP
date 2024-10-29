const CORRECT_LOGIN_DATA = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};
const WRONG_LOGIN_DATA = {
  email: "wrong" + process.env.EMAIL,
  password: "wrong" + process.env.PASSWORD
};
const WRONG_EMAIL_DATA = {
  email: "wrong" + process.env.EMAIL,
  password: process.env.PASSWORD
};
const WRONG_PASSWORD_DATA = {
  email: process.env.EMAIL,
  password: "wrong" + process.env.PASSWORD
};
const EMPTY_EMAIL_DATA = {
  email: "",
  password: process.env.PASSWORD
}
const EMPTY_PASSWORD_DATA = {
  email: process.env.EMAIL,
  password: ""
}
const WRONG_EMAIL_FORMAT_DATA = {
  email: "wrongemail",
  password: process.env.PASSWORD
};
const WRONG_PASSWORD_FORMAT_DATA = {
  email: process.env.EMAIL,
  password: "wrong"
};
export {
  CORRECT_LOGIN_DATA,
  WRONG_LOGIN_DATA,
  WRONG_EMAIL_DATA,
  WRONG_PASSWORD_DATA,
  EMPTY_EMAIL_DATA,
  EMPTY_PASSWORD_DATA,
  WRONG_EMAIL_FORMAT_DATA,
  WRONG_PASSWORD_FORMAT_DATA,
};