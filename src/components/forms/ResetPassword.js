import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password, resetState } from '../../actions/auth';
import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';

const ResetPassword = ({
  requestSuccess,
  requestFail,
  resetState,
  reset_password,
}) => {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      resetState();
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };
  if (requestSent === requestSuccess) navigate('/');

  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Request reset password
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label="Your email :"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="email"
          />
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">Send</BtnPrimary>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
});
export default connect(mapStateToProps, { reset_password, resetState })(
  ResetPassword
);
