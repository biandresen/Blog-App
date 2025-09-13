import axios from "axios";
import BLOG_API from "../api/blog-api";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const registerUser = async ({ username, email, password, passwordConfirmation }: RegisterUser) => {
  try {
    const res = await axios.post(BLOG_API.BASE + BLOG_API.REGISTER, {
      username,
      email,
      password,
      passwordConfirmation,
    });
    return res.data; // success case
  } catch (err: any) {
    if (err.response) {
      // Server responded with 400+
      return Promise.reject(err.response.data.errors);
    } else {
      // Network or unknown error
      return Promise.reject({ message: err.message || "Something went wrong" });
    }
  }
};
