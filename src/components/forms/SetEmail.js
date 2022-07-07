import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { set_email, resetState } from '../../actions/auth';
import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';

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
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField
            label="new email"
            type="email"
            name="new_email"
            id="new_email"
            value={new_email}
            onChange={onChange}
            error={set_email_error && set_email_error.new_email && true}
            helperText={set_email_error && set_email_error.new_email}
            placeholder="email"
            required
          />
        </div>
        <div>
          <TextField
            label="retype email"
            type="email"
            name="re_new_email"
            id="re_new_email"
            value={re_new_email}
            onChange={onChange}
            error={set_email_error && set_email_error.non_field_errors && true}
            helperText={set_email_error && set_email_error.non_field_errors}
            placeholder="email"
            required
          />
        </div>
        <div>
          <TextField
            label="Your password :"
            type="password"
            name="current_password"
            id="current_password"
            placeholder="8 character"
            value={current_password}
            onChange={onChange}
            minLength="8"
            required
            error={set_email_error && set_email_error.current_password && true}
            helperText={set_email_error && set_email_error.current_password[0]}
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
  set_email_error: state.auth.set_email_error,
});
export default connect(mapStateToProps, { set_email, resetState })(SetEmail);
