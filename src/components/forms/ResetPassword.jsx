import React, { useEffect, useState } from 'react';
import { resetState, reset_password } from '../../actions/auth';
import { TaskAlt } from '@mui/icons-material';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import translate from '../../translate';

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
    // if (requestSuccess) {
    //   resetState();
    // }
  }, [requestFail, requestSuccess]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };
  // if (requestSent === requestSuccess) navigate('/');
  if (requestSuccess)
    return (
      <div className=" mt-20 mx-10 flex flex-col justify-center items-center space-y-4 text-center">
        <TaskAlt fontSize="large" />
        <p className=" font-bold">{translate('Request Sent.')}</p>
        <p>
          {translate(
            'please click on the link sent to you by email, to reset your password.'
          )}
        </p>
        <p>{translate('it may be in the spam folder!!')}</p>
      </div>
    );
  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        {translate('Request reset password')}
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
            placeholder={translate('email')}
            required
          />
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">{translate('send')}</BtnPrimary>
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
