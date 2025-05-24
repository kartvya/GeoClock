export const BASE_URL =
  'https://scanners-russian-thomas-entrepreneurs.trycloudflare.com/api/v1';

export const apiMethod = {
  put: 'PUT',
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const endpoint = {
  login: '/auth/login',
  refreshToken: '/auth/refresh',
  getUserInfo: '/auth/me',
  clockIn: '/attendance/attendance/check-in',
  clockOut: '/attendance/attendance/check-out',
  clockStatus: '/attendance/attendance/me',
  getTodaysAttendance: '/attendance/attendance/today-status',
  getLeavetype: '/leaves/leaves/types',
  applyLeave: '/leaves/leaves/apply',
};

export const ACTIONCONSTANTS = {
  SET_IS_AUTHENTICATED: 'auth/SET_IS_AUTHENTICATED',
  SET_IDENTITY: 'auth/SET_IDENTITY',
  SET_USERINFO: 'auth/SET_USERINFO',
  CLEAR_IDENTITY: 'auth/CLEAR_IDENTITY',
  SET_TOGGLE_ATTENDANCE: 'attendance/SET_TOGGLE_ATTENDANCE',
};
