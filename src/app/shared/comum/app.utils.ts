import { HttpHeaders } from '@angular/common/http';
export const BASE_URL = 'https://apioptimum.herokuapp.com/';
export const URL_TOKEN = BASE_URL + 'oauth/token';
export const REGISTER_URL = BASE_URL + 'api/public/registration/users';
export const CONFIRM_REGISTER_URL = BASE_URL + 'api/public/regitrationConfirm/users';
export const RESEND_REGISTER_TOKEN_URL = BASE_URL + 'api/public/resendRegistrationToken/users';
const headersToken = new HttpHeaders({
 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
 });
export const OPTIONS_OBJECTO = { headers: headersToken };
export const HEADERS_LOGIN = new HttpHeaders({
 Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
 });
export const HEADERS_REGISTER = new HttpHeaders({
 Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
 });
export const HEADERS_COMMUN = new HttpHeaders({
 Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
 });
