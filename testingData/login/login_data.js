const EMPTY_DATA = {
    email: "",
    password: "",
  };
  
  const CORRECT_LOGIN_DATA = {
    email: process.env.EMAIL + "",
    password: process.env.PASSWORD + "",
  };
  
  const WRONG_LOGIN_DATA = {
    email: "wrong" + process.env.EMAIL,
    password: "wrong" + process.env.PASSWORD,
  };
  
  const WRONG_EMAIL_DATA = {
    email: "wrong" + process.env.EMAIL,
    password: (process.env.PASSWORD = ""),
  };
  
  const WRONG_PASSWORD_DATA = {
    email: process.env.EMAIL + "",
    password: "wrong" + process.env.PASSWORD,
  };
  
  const EMPTY_EMAIL_DATA = {
    email: "",
    password: process.env.PASSWORD + "",
  };
  
  const EMPTY_PASSWORD_DATA = {
    email: process.env.EMAIL + "",
    password: "",
  };
  
  const WRONG_FORMATTED_EMAIL_DATA = {
    email: "wrongemail",
    password: process.env.PASSWORD + "",
  };
  
  const WRONG_FORMATTED_PASSWORD_DATA = {
    email: process.env.EMAIL + "",
    password: "wrong",
  };
  
  const FormValidationDynamicTest = [
    {
      testName: "is empty email and password disables submit button",
      formData: EMPTY_DATA,
    },
    {
      testName: "is invalid email format disables submit button",
      formData: WRONG_FORMATTED_EMAIL_DATA,
    },
    {
      testName: "is invalid password format disables submit button",
      formData: WRONG_FORMATTED_PASSWORD_DATA,
    },
    {
      testName: "is empty email format disables submit button",
      formData: EMPTY_EMAIL_DATA,
    },
    {
      testName: "is empty password format disables submit button",
      formData: EMPTY_PASSWORD_DATA,
    },
  ];
  
  export {
    FormValidationDynamicTest,
    EMPTY_DATA,
    CORRECT_LOGIN_DATA,
    WRONG_LOGIN_DATA,
    WRONG_EMAIL_DATA,
    WRONG_PASSWORD_DATA,
    EMPTY_EMAIL_DATA,
    EMPTY_PASSWORD_DATA,
    WRONG_FORMATTED_EMAIL_DATA,
    WRONG_FORMATTED_PASSWORD_DATA,
  };
  