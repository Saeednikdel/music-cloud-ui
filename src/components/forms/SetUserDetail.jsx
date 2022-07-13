import React, { useEffect, useState } from 'react';
import { resetState, set_user_detail } from '../../actions/auth';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { connect } from 'react-redux';

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
    <form
      className=" space-y-2 flex flex-col"
      autoComplete="off"
      onSubmit={(e) => onSubmit(e)}>
      <TextField
        type="text"
        label="user name"
        name="name"
        value={name}
        error={set_detail_error && set_detail_error.name && true}
        helperText={
          set_detail_error && set_detail_error.name && set_detail_error.name[0]
        }
        onChange={(e) => onChange(e)}
        required
      />
      <TextField
        type="text"
        label="name"
        name="profile_name"
        value={profile_name}
        onChange={(e) => onChange(e)}
        required
      />
      <TextField
        type="text"
        label="biography"
        name="bio"
        value={bio}
        onChange={(e) => onChange(e)}
      />
      <div className="text-center">
        <BtnPrimary type="submit">ok</BtnPrimary>
      </div>
    </form>
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
