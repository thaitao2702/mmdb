import React from 'react';
import { Formik, Form } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { constraint, validate } from 'shared/utils/validations';
import BasicInput from 'shared/components/Form/BasicInput';
import { AuthBtn } from 'shared/components/Btn';

import { useApi } from 'shared/hooks/api';
import useToast from 'shared/hooks/toast';
import { ApiUrl } from 'shared/config/apiUrl';
import { storeAuthData } from 'shared/utils/auth';
import { UserRole } from 'shared/const';

export interface IUser {
  name: string;
  email: string;
  id: string | number;
}
export interface IRegisterResponse {
  user: IUser;
  token: string;
  userRole: UserRole;
}

interface IFormValue {
  [key: string]: any;
}

const formValidate = (value: IFormValue) =>
  validate(value, {
    name: [constraint.required()],
    email: [constraint.required(), constraint.email()],
    password: [constraint.required(), constraint.minLength(8)],
    rePassword: [
      constraint.required(),
      constraint.minLength(8),
      constraint.match('password', 'password does not match'),
    ],
  });

const initialValues = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
};

const Register = () => {
  const [state, callSignUpApi] = useApi('post', ApiUrl.signUp);
  const Toast = useToast();
  const navigate = useNavigate();

  const persistLoginData = (userData: IRegisterResponse) => {
    const data = {
      userId: userData.user.id,
      token: userData.token,
      userRole: userData.userRole,
    };
    storeAuthData(data);
  };

  return (
    <div className="c-before-login-register l-before-login-content-ctn">
      <div className="c-before-login-register__content">
        <div className="main-heading">Create account</div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={formValidate}
          onSubmit={async (value) => {
            try {
              const data = (await callSignUpApi(value)) as IRegisterResponse;
              Toast.success('Register success');
              persistLoginData(data);
              setTimeout(() => navigate('/'), 500);
            } catch (err) {
              Toast.error((err as { message: string }).message);
              console.log(err);
            }
          }}
        >
          {() => (
            <Form>
              <BasicInput type="text" name="name" label="Your name" className="mt-15"></BasicInput>
              <BasicInput type="text" name="email" label="Email" className="mt-15"></BasicInput>
              <BasicInput
                type="password"
                name="password"
                label="Password"
                tooltip="Passwords must be at least 8 characters."
              ></BasicInput>
              <BasicInput type="password" name="rePassword" label="Re-enter password"></BasicInput>
              <AuthBtn
                type="submit"
                className="auth-btn--yellow mt-20"
                disabled={state.loading}
                enableSpinner={true}
              >
                Create your IMDb accout
              </AuthBtn>
            </Form>
          )}
        </Formik>
        <div className="divider-inner mt-25"></div>
        <div className="row">
          <span className="mr-3">Already have an account?</span>
          <NavLink to="/auth/login">
            <span className="before-login-link">Sign-in</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
