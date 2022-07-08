import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, resetState } from '../../actions/auth';
import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';

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
    if (requestSuccess) {
      resetState();
      setRequestSent(false);
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup(name.toLowerCase(), email.toLowerCase(), password, re_password);
    setRequestSent(true);
  };
  if (isAuthenticated) navigate('/');

  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Sign up
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label="User name :"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="user name"
            required
            error={signup_error && signup_error.name && true}
            helperText={
              signup_error && signup_error.name && signup_error.name[0]
            }
          />
        </div>
        <div>
          <TextField
            label="Your email :"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="email"
            required
            error={signup_error && signup_error.email && true}
            helperText={signup_error && signup_error.email}
          />
        </div>
        <div>
          <TextField
            label="Your password :"
            type="password"
            name="password"
            id="password"
            minLength="8"
            value={password}
            onChange={onChange}
            placeholder="at least 8 character"
            required
            error={signup_error && signup_error.password && true}
            helperText={
              signup_error && signup_error.password && signup_error.password[0]
            }
          />
        </div>
        <div>
          <TextField
            label="Retype password :"
            type="password"
            name="re_password"
            id="re_password"
            placeholder="at least 8 character"
            minLength="8"
            required
            value={re_password}
            onChange={onChange}
            error={signup_error && signup_error.non_field_errors && true}
            helperText={signup_error && signup_error.non_field_errors}
          />
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">Create Account</BtnPrimary>
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already Signed up?
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-500 mx-2">
            Login
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
