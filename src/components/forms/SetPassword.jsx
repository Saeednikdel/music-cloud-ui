import React, { useEffect, useState } from 'react';
import { resetState, set_password } from '../../actions/auth';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';
import translate from '../../translate';

const SetPassword = ({
  set_password,
  setOpenPopup,
  requestSuccess,
  resetState,
  requestFail,
  set_pass_error,
}) => {
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
    current_password: '',
  });
  const [requestSent, setRequestSent] = useState(false);
  const { new_password, re_new_password, current_password } = formData;
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
    set_password(new_password, re_new_password, current_password);
    setRequestSent(true);
  };
  return (
    <form className=" space-y-2 flex flex-col" onSubmit={onSubmit}>
      <TextField
        label={translate('new password')}
        type="password"
        name="new_password"
        id="new_password"
        placeholder="********"
        value={new_password}
        onChange={onChange}
        minLength="8"
        required
        error={set_pass_error && set_pass_error.new_password && true}
        helperText={
          set_pass_error &&
          set_pass_error.new_password &&
          translate(set_pass_error.new_password[0])
        }
      />
      <TextField
        label={translate('retype password')}
        type="password"
        name="re_new_password"
        id="re_new_password"
        placeholder="********"
        value={re_new_password}
        onChange={onChange}
        minLength="8"
        required
        error={set_pass_error && set_pass_error.non_field_errors && true}
        helperText={
          set_pass_error && translate(set_pass_error.non_field_errors)
        }
      />
      <TextField
        label={translate('current password')}
        type="password"
        name="current_password"
        id="current_password"
        placeholder="********"
        value={current_password}
        onChange={onChange}
        minLength="8"
        required
        error={set_pass_error && set_pass_error.current_password && true}
        helperText={
          set_pass_error &&
          set_pass_error.current_password &&
          translate(set_pass_error.current_password[0])
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
  set_pass_error: state.auth.set_pass_error,
});
export default connect(mapStateToProps, { set_password, resetState })(
  SetPassword
);
