import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

//* Get Username from token
export const getUsername = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      return decodedToken;
    }
  }
};

//* Authenticate function
export const authenticate = async (username) => {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: error };
  }
};

//* Get User details
export const getUser = async ({ username }) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "password doesn't match" };
  }
};

//* Register User
export const registerUser = async (credentials) => {
  try {
    const {
      data: { message },
      status,
    } = await axios.post("/api/register", credentials);

    let { username, email } = credentials;

    //* send email to successfully registered user
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: message,
      });
    }
    return { message };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during registration.";
    return Promise.reject({ message: errorMessage });
  }
};

//* Login User
export const loginUser = async ({ username, password }) => {
  try {
    if (username && password) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "password doesn't match" });
  }
};

//* Update User
export const updateUser = async (response) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await axios.put("/api/updateUser", response, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Couldn't update profile" });
  }
};

//* Generate OTP
export const generateOTP = async (username) => {
  try {
    const {
      data: { otp }, status } = await axios.get("/api/generateOTP", { params: { username } });
    if (status === 201) {
      let {email} = await getUser({ username });
      let text = `Your password recover OTP is ${otp}. verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
      return Promise.resolve(otp);
    }
  } catch (error) {
    return Promise.reject({ error});
  }
};

//* Verify OTP
export const verifyOTP = async ({ username, otp }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, otp },
    });
    console.log(data, status);
    return { data, status };
  } catch (error) {
    return Promise.reject({ error: "Couldn't verify OTP" });
  }
};

//* Reset Password
export const resetPassword = async ({ username, password }) => {
  console.log(username, password);
  try {
    const { data, status } = await axios.put("/api/updatePassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error: "Couldn't reset password" });
  }
};
