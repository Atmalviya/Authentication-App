import toast from "react-hot-toast";

export const userNameValidator = async (values) => {
  const error = checkUsername({}, values);
  return error;
};

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
}

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
  if (!values.Username) {
    error.Username = toast.error("Username is required");
  } else if (values.Username.includes(" ")) {
    error.Username = toast.error("Username cannot contain spaces");
  }
  return error;
}
