import toast from "react-hot-toast";

//* validate username
export const userNameValidator = async (values) => {
  const error = checkUsername({}, values);
  return error;
};

// * Validate password
export const passwordValidator = async (values) => {
  const error = checkPassword({}, values);
  return error;
};

//* Validate reset password
export const resetPasswordValidator = async (values) => {
  const error = checkPassword({}, values);
  if (values.Password !== values.confirmPassword) {
    error.exist = toast.error("Passwords do not match");
  }
  return error;
};

//* validate register form
export const registerValidator = async (values) => {
  const error = checkUsername({}, values);
  checkPassword(error, values);
  checkEmail(error, values);
  return error;
};

//* validate prfile form
export const profileValidator = async (values) => {
  const error = checkEmail({}, values);
  return error;
};

//* checking Email
const checkEmail = async (error = {}, values) => {
  if (!values.email) {
    error.email = toast.error("Email is required");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Email cannot contain spaces");
  }
  return error;
};

//* checking password
const checkPassword = async (error = {}, values) => {
  /* eslint-disable no-useless-escape */
  const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.Password) {
    error.Password = toast.error("Password is required");
  } else if (values.Password.includes(" ")) {
    error.Password = toast.error("Password cannot contain spaces");
  } else if (values.Password.length < 8) {
    error.Password = toast.error("Password must be at least 8 characters");
  } else if (!specialChars.test(values.Password)) {
    error.Password = toast.error("Password must contain special characters");
  }
  return error;
};

//* checking userName
function checkUsername(error = {}, values) {
  if (!values.userName) {
    error.userName = toast.error("Username Required...!");
  } else if (values.userName.includes(" ")) {
    error.userName = toast.error("Invalid Username...!");
  }

  return error;
}
