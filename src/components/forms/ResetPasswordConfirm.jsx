import React, { useEffect, useState } from 'react';
import { resetState, reset_password_confirm } from '../../actions/auth';
import { useNavigate, useParams } from 'react-router-dom';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';
import translate from '../../translate';

const ResetPasswordConfirm = ({
  requestSuccess,
  reset_password_confirm,
  resetState,
  requestFail,
  reset_pass_error,
}) => {
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
  });

  const { new_password, re_new_password } = formData;
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

    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };
  if (requestSent === requestSuccess) navigate(`/`);
  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        {translate('Enter New Password')}
      </h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label={translate('new password')}
            type="password"
            name="new_password"
            id="new_password"
            minLength="8"
            placeholder="********"
            value={new_password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <TextField
            label={translate('retype password')}
            type="password"
            name="re_new_password"
            minLength="8"
            id="re_new_password"
            placeholder="********"
            value={re_new_password}
            onChange={onChange}
            required
          />
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">{translate('ok')}</BtnPrimary>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  reset_pass_error: state.auth.reset_pass_error,
});
export default connect(mapStateToProps, { reset_password_confirm, resetState })(
  ResetPasswordConfirm
);
