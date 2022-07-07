import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { set_password, resetState } from '../../actions/auth';
import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';

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
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label="new password"
            type="password"
            name="new_password"
            id="new_password"
            placeholder="8 character"
            value={new_password}
            onChange={onChange}
            minLength="8"
            required
            error={set_pass_error && set_pass_error.new_password && true}
            helperText={
              set_pass_error &&
              set_pass_error.new_password &&
              set_pass_error.new_password[0]
            }
          />
        </div>
        <div>
          <TextField
            label="retype password"
            type="password"
            name="re_new_password"
            id="re_new_password"
            placeholder="8 character"
            value={re_new_password}
            onChange={onChange}
            minLength="8"
            required
            error={set_pass_error && set_pass_error.non_field_errors && true}
            helperText={set_pass_error && set_pass_error.non_field_errors}
          />
        </div>
        <div>
          <TextField
            label="current password"
            type="password"
            name="current_password"
            id="current_password"
            placeholder="8 character"
            value={current_password}
            onChange={onChange}
            minLength="8"
            required
            error={set_pass_error && set_pass_error.current_password && true}
            helperText={set_pass_error && set_pass_error.current_password[0]}
          />
        </div>
        <div className="text-center">
          <BtnPrimary type="submit">ok</BtnPrimary>
        </div>
      </form>
    </div>
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
