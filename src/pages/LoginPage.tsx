import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { login } from '../services/loginService';
import { useLocalStorage } from '../utils/useLocalStorage';

function validateUserName(value: string) {
  if (!value) {
    return 'Email is required';
  }
}

function validatePassword(value: string) {
  if (!value) {
    return 'Password is required';
  }
    
  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage<string>('user', '');

  const [error, setError] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ username, password }) => {
          return login({ username, password })
            .then((res) => {
              navigate('/');
              setUser(res)
            })
            .catch(error => {
              setError(error.message);
            })
            .finally(() => {
              setTimeout(() => {
                setError('');
              }, 3000);
            })

        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Log in</h1>

            <div className="field">
              <label htmlFor="email" className="label">User Name</label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateUserName}
                  name="username"
                  type="text"
                  id="email"
                  placeholder="username"
                  className={cn('input', {
                    'is-danger': touched.username && errors.username,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>

                {touched.username && errors.username && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.username && errors.username && (
                <p className="help is-danger">{errors.username}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="help is-danger">{errors.password}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>

            <div className="field">
              <button
                type="submit"
                className={cn('button is-success has-text-weight-bold', {
                  'is-loading': isSubmitting,
                })}
                disabled={isSubmitting || !!errors.username || !!errors.password}
              >
                Log in
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
