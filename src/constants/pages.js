export const LOGIN='/login';
export const AUTH='/authentication/:action';
export const HOME='/';

export const COURSE = '/course';
export const CREATE_COURSE = '/course/create';
export const EDIT_COURSE = '/course/edit/:id';
export const EDIT_COURSE_ID = (id) => `/course/edit/${id}`;

export const TEACHER = '/teacher';
export const CREATE_TEACHER = '/teacher/create';
export const EDIT_TEACHER = '/teacher/edit/:id';
export const EDIT_TEACHER_ID = (id) => `/teacher/edit/${id}`;

export const UNAUTHORIZE = '/unauthorize';
export const NOTFOUND = '/notfound';