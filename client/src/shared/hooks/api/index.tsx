import { useState, useCallback } from 'react';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { api as normalApi, uploadFileApi } from 'shared/utils/api';
import { resetAuthData } from 'shared/utils/auth';
import { IApiMethods } from 'shared/types';

export interface IErrorResponse {
  name: string;
  code: string | number;
  message: string;
  status: number;
  data: { [key: string]: any };
}

const defaultError: IErrorResponse = {
  name: 'General Error',
  code: 'INTERNAL_ERROR',
  message: 'Something went wrong. Please check your internet connection or contact our support.',
  status: 503,
  data: {},
};

enum ApiType {
  Normal,
  Upload,
}

interface IApiState {
  loading: boolean;
  error: boolean | Error | undefined;
  data: object;
}

export const useGeneralApi = (type: ApiType, method: IApiMethods, url: string) => {
  const api = type === ApiType.Normal ? normalApi : uploadFileApi;
  const [state, updateState] = useState<IApiState>({
    loading: false,
    error: false,
    data: {},
  });
  const navigate = useNavigate();

  const makeRequest = useCallback(
    (data?: { [key: string]: any }) =>
      new Promise((resolve, reject) => {
        updateState((prevState) => ({ ...prevState, loading: true }));
        api(method, url, data).then(
          (data) => {
            resolve(data);
            updateState(() => ({ data, loading: false, error: false }));
          },
          (error) => {
            let errObj: Error | undefined;
            if (error.response) {
              errObj = get(error.response, 'data.error') || defaultError;
              const code = get(error.response, 'data.error.code');
              if (code && code === 'INVALID_TOKEN') {
                resetAuthData();
                navigate('/');
              }
            } else {
              errObj = defaultError;
            }
            console.log('errObj', errObj);
            updateState(() => ({ data: {}, loading: false, error: errObj }));
            reject(errObj);
          },
        );
      }),
    [method, url],
  );

  return [state, makeRequest] as const;
};

export const useApi = (method: IApiMethods, url: string) =>
  useGeneralApi(ApiType.Normal, method, url);

export const useUploadApi = (method: IApiMethods, url: string) =>
  useGeneralApi(ApiType.Upload, method, url);
