import axios from 'axios';

import { getAuthToken } from 'shared/utils/auth';
import { IApiMethods } from 'shared/types';

export const apiMethods: { [K in IApiMethods]: IApiMethods } = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  delete: 'delete',
};
const baseUrl = 'http://localhost:3000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : '',
});

const getFormDataHeaders = () => ({
  'Content-Type': 'multipart/form-data',
  Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : '',
});

type IApi = (method: IApiMethods, url: string, variables?: { [key: string]: any }) => Promise<any>;

export const api: IApi = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}${url}`,
      method,
      headers: getHeaders(),
      data: method !== 'get' ? variables : null,
      params: method === 'get' ? variables : null,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error);
      },
    );
  });

export const uploadFileApi: IApi = (method, url, formData) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}${url}`,
      method,
      headers: getFormDataHeaders(),
      data: formData,
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error);
      },
    );
  });
