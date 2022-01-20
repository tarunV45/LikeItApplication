import * as api from "../api";
import { AUTH } from "../constants/actionType";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //signing in
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //signing up
  } catch (error) {
    console.log(error);
  }
};
