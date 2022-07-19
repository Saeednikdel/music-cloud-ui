import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { resetState, signup } from '../../actions/auth';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';
import { TaskAlt } from '@mui/icons-material';
import translate from '../../translate';

const Signup = ({
  signup,
  isAuthenticated,
  requestSuccess,
  requestFail,
  resetState,
  signup_error,
}) => {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });
  const { name, email, password, re_password } = formData;
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
  }, [requestFail]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup(name.toLowerCase(), email.toLowerCase(), password, re_password);
    setRequestSent(true);
  };
  if (isAuthenticated) navigate('/');
  if (requestSuccess)
    return (
      <div className=" mt-20 mx-10 flex flex-col justify-center items-center space-y-4 text-center">
        <TaskAlt fontSize="large" />
        <p className=" font-bold">{translate('your account created.')}</p>
        <p>
          {translate(
            'please click on the link sent to you by email, to verify your email address.'
          )}
        </p>
        <p>{translate('it may be in the spam folder!!')}</p>
      </div>
    );
  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        {translate('sign up')}
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label={translate('user name')}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            placeholder={translate('user name')}
            required
            error={signup_error && signup_error.name && true}
            helperText={
              signup_error &&
              signup_error.name &&
              translate(signup_error.name[0])
            }
          />
        </div>
        <div>
          <TextField
            label={translate('email')}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder={translate('email')}
            required
            error={signup_error && signup_error.email && true}
            helperText={signup_error && translate(signup_error.email)}
          />
        </div>
        <div>
          <TextField
            label={translate('password')}
            type="password"
            name="password"
            id="password"
            minLength="8"
            value={password}
            onChange={onChange}
            placeholder="********"
            required
            error={signup_error && signup_error.password && true}
            helperText={
              signup_error &&
              signup_error.password &&
              translate(signup_error.password[0])
            }
          />
        </div>
        <div>
          <TextField
            label={translate('retype password')}
            type="password"
            name="re_password"
            id="re_password"
            placeholder="********"
            minLength="8"
            required
            value={re_password}
            onChange={onChange}
            error={signup_error && signup_error.non_field_errors && true}
            helperText={
              signup_error && translate(signup_error.non_field_errors)
            }
          />
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">{translate('sign up')}</BtnPrimary>
        </div>
        <div className="flex text-sm font-medium text-gray-500 dark:text-gray-300">
          <h1>{translate('you have signed up before?')}</h1>
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-500 mx-2">
            {translate('log in')}
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
  signup_error: state.auth.signup_error,
});

export default connect(mapStateToProps, { signup, resetState })(Signup);
