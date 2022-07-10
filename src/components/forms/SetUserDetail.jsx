import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { set_user_detail, resetState } from '../../actions/auth';
import TextField from '../TextField';
import BtnPrimary from '../BtnPrimary';

const SetUserDetail = ({
  _id,
  _name,
  _profile_name,
  _bio,
  setOpenPopup,
  set_user_detail,
  resetState,
  requestSuccess,
  requestFail,
  set_detail_error,
}) => {
  const [formData, setFormData] = useState({
    id: _id,
    name: _name,
    profile_name: _profile_name,
    bio: _bio,
  });
  const [requestSent, setRequestSent] = useState(false);
  const { id, name, profile_name, bio } = formData;
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
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    set_user_detail(id, name.toLowerCase(), profile_name, bio);
    setRequestSent(true);
  };

  return (
    <div>
      <form
        className=" space-y-2 flex flex-col items-center w-full"
        autoComplete="off"
        onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            type="text"
            label="user name"
            name="name"
            value={name}
            error={set_detail_error && set_detail_error.name && true}
            helperText={
              set_detail_error &&
              set_detail_error.name &&
              set_detail_error.name[0]
            }
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            type="text"
            label="name"
            name="profile_name"
            value={profile_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            type="text"
            label="biography"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <BtnPrimary type="submit">ok</BtnPrimary>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  set_detail_error: state.auth.set_detail_error,
});
export default connect(mapStateToProps, { set_user_detail, resetState })(
  SetUserDetail
);
