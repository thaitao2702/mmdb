import React, { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';

import { constraint, validate } from 'shared/utils/validations';
import BasicInput from 'shared/components/Form/BasicInput';
import { AuthBtn } from 'shared/components/Btn';
import TextWithMiddleLine from 'shared/components/TextWithMiddleLine';

import { useApi } from 'shared/hooks/api';
import useToast from 'shared/hooks/toast';
import { ApiUrl } from 'shared/config/apiUrl';
import { storeAuthToken } from 'shared/utils/token';

interface IFormValue {
  [key: string]: any;
}

interface ILoginResponse {
  user: object;
  token: string;
}

const formValidate = (value: IFormValue) =>
  validate(value, {
    email: [constraint.required(), constraint.email()],
    password: [constraint.required()],
  });

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const [state, callLoginApi] = useApi('post', ApiUrl.login);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const Toast = useToast();
  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, []);

  return (
    <div className="before-login-box-ctn content-ctn">
      <div className="login-box">
        <div className="main-heading">Sign-In</div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={formValidate}
          onSubmit={async (value) => {
            try {
              const data = (await callLoginApi(value)) as ILoginResponse;
              console.log(data);
              console.log(state);
              const authToken = data.token;
              if (authToken) storeAuthToken(authToken);
              Toast.success('Login success');
            } catch (err) {
              console.log('err', err);
              Toast.error((err as { message: string }).message);
            }
          }}
        >
          {() => (
            <Form>
              <BasicInput
                type="text"
                name="email"
                label="Email"
                ref={emailInputRef}
                className="mt-15"
              ></BasicInput>
              <BasicInput type="password" name="password" label="Password"></BasicInput>
              <AuthBtn
                type="submit"
                className="auth-btn--yellow mt-20"
                disabled={state.loading}
                enableSpinner={true}
              >
                Sign-In
              </AuthBtn>
            </Form>
          )}
        </Formik>
        <TextWithMiddleLine className="mt-15">
          <div style={{ fontSize: '13px', color: '#767676' }}>New to IMDb?</div>
        </TextWithMiddleLine>
        <NavLink to="/auth/register" className="header__item mt-5">
          <AuthBtn>Create your IMDb accout</AuthBtn>
        </NavLink>
        <button
          onClick={() =>
            Toast.success(
              'Toast success Toast success Toast successToast success Toast success Toast success Toast success Toast success Toast success',
            )
          }
        >
          Toast success
        </button>
        <button onClick={() => Toast.error('toast error')}>Toast error</button>
        <button onClick={() => Toast.warning('toast warning')}>Toast warning</button>
      </div>
    </div>
  );
};

export default Login;
