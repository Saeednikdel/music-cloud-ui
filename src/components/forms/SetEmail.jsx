import React, { useEffect, useState } from 'react';
import { resetState, set_email } from '../../actions/auth';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';
import translate from '../../translate';

const SetEmail = ({
  set_email,
  setOpenPopup,
  requestSuccess,
  requestFail,
  resetState,
  set_email_error,
}) => {
  const [formData, setFormData] = useState({
    new_email: '',
    re_new_email: '',
    current_password: '',
  });

  const { new_email, re_new_email, current_password } = formData;

  const [requestSent, setRequestSent] = useState(false);
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      setOpenPopup(false);
      resetState();
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    set_email(
      new_email.toLowerCase(),
      re_new_email.toLowerCase(),
      current_password
    );
    setRequestSent(true);
  };
  return (
    <form className=" space-y-2 flex flex-col" onSubmit={onSubmit}>
      <TextField
        label={translate('new email')}
        type="email"
        name="new_email"
        id="new_email"
        value={new_email}
        onChange={onChange}
        error={set_email_error && set_email_error.new_email && true}
        helperText={set_email_error && set_email_error.new_email}
        placeholder={translate('email')}
        required
      />
      <TextField
        label={translate('retype email')}
        type="email"
        name="re_new_email"
        id="re_new_email"
        value={re_new_email}
        onChange={onChange}
        error={set_email_error && set_email_error.non_field_errors && true}
        helperText={set_email_error && set_email_error.non_field_errors}
        placeholder={translate('email')}
        required
      />
      <TextField
        label={translate('password')}
        type="password"
        name="current_password"
        id="current_password"
        placeholder="********"
        value={current_password}
        onChange={onChange}
        minLength="8"
        required
        error={set_email_error && set_email_error.current_password && true}
        helperText={
          set_email_error &&
          set_email_error.current_password &&
          set_email_error.current_password[0]
        }
      />
      <div className="text-center">
        <BtnPrimary type="submit">{translate('ok')}</BtnPrimary>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  set_email_error: state.auth.set_email_error,
});
export default connect(mapStateToProps, { set_email, resetState })(SetEmail);
