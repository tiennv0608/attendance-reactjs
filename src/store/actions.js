import {
  SET_IS_LOGIN,
  SET_IS_ADMIN,
  SET_IS_TEACHER,
  SET_IS_STUDENT,
} from "./constants";

export const setIsLogin = (payload) => ({
  type: SET_IS_LOGIN,
  payload,
});

export const setIsAdmin = (payload) => ({
  type: SET_IS_ADMIN,
  payload,
});

export const setIsTeacher = (payload) => ({
  type: SET_IS_TEACHER,
  payload,
});

export const setIsStudent = (payload) => ({
  type: SET_IS_STUDENT,
  payload,
});
