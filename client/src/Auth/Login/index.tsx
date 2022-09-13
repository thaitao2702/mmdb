import React, { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { constraint, validate } from 'shared/utils/validations';
import BasicInput from 'shared/components/Form/BasicInput';
import { AuthBtn } from 'shared/components/Btn';
import TextWithMiddleLine from 'shared/components/TextWithMiddleLine';

import { useApi } from 'shared/hooks/api';
import useToast from 'shared/hooks/toast';
import { ApiUrl } from 'shared/config/apiUrl';
import { storeAuthData } from 'shared/utils/auth';
import { UserRole } from 'shared/const';
import { IRegisterResponse } from 'auth/Register';

interface IFormValue {
  [key: string]: any;
}

type ILoginResponse = IRegisterResponse;

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
  const navigate = useNavigate();

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, []);

  const persistLoginData = (userData: IRegisterResponse) => {
    const data = {
      userId: userData.user.id,
      token: userData.token,
      userRole: userData.userRole,
      name: userData.user.name,
    };
    storeAuthData(data);
  };

  return (
    <div className="c-before-login-login l-before-login-content-ctn">
      <div className="c-before-login-login__content">
        <div className="main-heading">Sign-In</div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={formValidate}
          onSubmit={async (value) => {
            try {
              const data = (await callLoginApi(value)) as ILoginResponse;
              persistLoginData(data);
              Toast.success('Login success');
              setTimeout(() => {
                if (data.userRole === UserRole.Admin) navigate('/admin/movies');
                else navigate('/');
              }, 500);
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
      </div>
    </div>
  );
};

export default Login;
