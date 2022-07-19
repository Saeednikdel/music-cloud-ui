import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { login, resetState } from '../../actions/auth';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';
import translate from '../../translate';

const Login = ({
  login,
  isAuthenticated,
  requestFail,
  resetState,
  login_error,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (requestFail) {
      resetState();
    }
    if (isAuthenticated) {
      resetState();
    }
  }, [requestFail, isAuthenticated]);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email.toLowerCase(), password);
  };
  if (isAuthenticated) navigate('/');
  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        {translate('log in')}
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label={translate('email')}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            error={login_error && login_error.detail && true}
            helperText={
              login_error &&
              login_error.detail &&
              translate("password or email doesn't match")
            }
            placeholder={translate('email')}
            required
          />
        </div>
        <div>
          <TextField
            label={translate('email')}
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={onChange}
            // minLength="8"
            required
          />
        </div>
        <div className="flex justify-end">
          <Link
            to="/reset_password"
            className="text-sm text-blue-600 hover:underline dark:text-blue-500">
            {translate('forgot your password?')}
          </Link>
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">{translate('log in')}</BtnPrimary>
        </div>
        <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
          <h1>{translate("haven't sign up yet?")}</h1>
          <Link
            to="/signup"
            className="text-blue-600 hover:underline dark:text-blue-500 mx-2">
            {translate('sign up')}
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  login_error: state.auth.login_error,
});

export default connect(mapStateToProps, { login, resetState })(Login);
