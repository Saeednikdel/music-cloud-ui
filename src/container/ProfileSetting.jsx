import { AddAPhotoTwoTone, Edit } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { load_user, update_avatar } from '../actions/auth';

import BtnPrimary from '../components/BtnPrimary';
import BtnSecondary from '../components/BtnSecondary';
import CircularProgress from '../components/CircularProgress';
import OutsideClickHandler from 'react-outside-click-handler';
import Popup from '../components/Popup';
import Resizer from 'react-image-file-resizer';
import SetEmail from '../components/forms/SetEmail';
import SetPassword from '../components/forms/SetPassword';
import SetUserDetail from '../components/forms/SetUserDetail';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const ProfileSetting = ({
  user,
  load_user,
  logout,
  update_avatar,
  isAuthenticated,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await load_user();
      } catch (err) {}
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [openPopup, setOpenPopup] = useState(false);
  const [childComponent, setchildComponent] = useState('');
  const handleDialog = (btnname) => {
    setchildComponent(btnname);
    setOpenPopup(true);
  };

  function ChildrenComponent({ value }) {
    switch (value) {
      case 'edit info':
        return (
          <SetUserDetail
            _id={user.id}
            _name={user.name}
            _profile_name={user.profile_name}
            _bio={user.bio}
            _phone_no={user.phone_no}
            _birth_date={user.birth_date}
            setOpenPopup={setOpenPopup}
          />
        );
      case 'change email':
        return <SetEmail setOpenPopup={setOpenPopup} />;
      case 'change password':
        return <SetPassword setOpenPopup={setOpenPopup} />;
      default:
        return false;
    }
  }
  const resizeFile = (file, format, max) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        max,
        max,
        format,
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    });
  async function uploadAvatar(e) {
    const format = e.target.files[0].type.split('/').pop();
    const image = await resizeFile(e.target.files[0], format, 500);
    update_avatar(image, 'avatar');
  }
  async function uploadHeader(e) {
    const format = e.target.files[0].type.split('/').pop();
    const image = await resizeFile(e.target.files[0], format, 1000);
    update_avatar(image, 'header');
  }
  if (!isAuthenticated) navigate('/login');

  return user ? (
    <div className="pb-24">
      <div className=" relative">
        <div className="w-full h-32 md:h-40 overflow-hidden bg-blue-600">
          {user.header && (
            <img
              alt="header"
              className="w-full h-32 md:h-40 object-cover"
              src={user.header}
            />
          )}
        </div>
        <label
          htmlFor="contained-button-file1"
          className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <input
            accept="image/jpeg,image/png"
            id="contained-button-file1"
            className=" hidden"
            type="file"
            onChange={uploadHeader}
          />
          <AddAPhotoTwoTone
            fontSize="large"
            className=" text-white bg-gray-900/50 hover:cursor-pointer rounded p-1"
          />
        </label>
      </div>

      <div className=" relative w-fit">
        <div className="h-20 w-20 object-cover md:h-28 md:w-28 rounded-full -mt-10 md:-mt-14 mx-10 md:mx-14 border-4 border-gray-300 dark:border-gray-700 relative overflow-hidden bg-green-600">
          {user.image ? (
            <img alt="avatar" className=" object-cover " src={user.image} />
          ) : (
            <h1 className=" text-4xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              {user.name && user.name.slice(0, 2).toUpperCase()}
            </h1>
          )}
        </div>
        <label
          htmlFor="contained-button-file"
          className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <input
            accept="image/jpeg,image/png"
            id="contained-button-file"
            className=" hidden"
            type="file"
            onChange={uploadAvatar}
          />
          <AddAPhotoTwoTone
            style={{ fontSize: 30 }}
            className=" text-white bg-gray-900/50 hover:cursor-pointer  rounded p-1"
          />
        </label>
      </div>

      <div className="flex flex-1 justify-end mx-4">
        <BtnPrimary onClick={() => handleDialog('edit info')}>
          edit info
        </BtnPrimary>
      </div>
      <div className="p-4 space-y-2 divide-y divide-gray-300 dark:divide-gray-600">
        <div>
          <h1>user name :</h1>
          <h1>{user.name ? user.name : '--'}@</h1>
        </div>
        <div>
          <h1>name :</h1>
          <h1>{user.profile_name ? user.profile_name : '--'}</h1>
        </div>
        <div>
          <h1>biography :</h1>
          <h1>{user.bio ? user.bio : '--'}</h1>
        </div>
        <div>
          <h1>email :</h1>
          <h1>
            {user.email ? user.email : '--'}
            <Edit
              fontSize="small"
              className=" hover:cursor-pointer mx-4"
              onClick={() => handleDialog('change email')}
            />
          </h1>
        </div>
        <div>
          <h1>password :</h1>
          <h1>
            ********
            <Edit
              fontSize="small"
              className=" hover:cursor-pointer mx-4"
              onClick={() => handleDialog('change password')}
            />
          </h1>
        </div>
      </div>
      <div className="mx-4">
        <BtnSecondary onClick={() => logout()}>log out</BtnSecondary>
      </div>
      <OutsideClickHandler
        disabled={!openPopup}
        onOutsideClick={() => setOpenPopup(!openPopup)}>
        <Popup
          title={childComponent}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <ChildrenComponent value={childComponent} />
        </Popup>
      </OutsideClickHandler>
    </div>
  ) : (
    <CircularProgress />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { load_user, logout, update_avatar })(
  ProfileSetting
);
