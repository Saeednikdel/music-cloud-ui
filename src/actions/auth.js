import {
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  FOLLOW_FAIL,
  FOLLOW_SUCCESS,
  LOAD_NOTIF_FAIL,
  LOAD_NOTIF_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_PASSWORD_CONFIRM_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_STATE,
  SET_EMAIL_FAIL,
  SET_EMAIL_SUCCESS,
  SET_PASSWORD_FAIL,
  SET_PASSWORD_SUCCESS,
  SET_USER_DETAIL_FAIL,
  SET_USER_DETAIL_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  UPDATE_AVATAR_FAIL,
  UPDATE_AVATAR_SUCCESS,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
} from './types';

import axios from 'axios';
import { load_profile } from './cloud';

export const load_notif =
  (page = 1) =>
  async (dispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };
      const userId = localStorage.getItem('id');
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cloud/notification/${userId}/${page}/`,
          config
        );

        dispatch({
          type: LOAD_NOTIF_SUCCESS,
          payload: res.data,
          page: page,
        });
      } catch (err) {
        dispatch({
          type: LOAD_NOTIF_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_NOTIF_FAIL,
      });
    }
  };
export const update_avatar = (image, path) => async (dispatch) => {
  let formData = new FormData();
  const user = localStorage.getItem('id');
  if (path === 'avatar') {
    formData.append('image', image);
  } else {
    formData.append('header', image);
  }

  formData.append('id', user);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/accounts/${path}/`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_AVATAR_SUCCESS,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: UPDATE_AVATAR_FAIL,
    });
  }
};
export const follow_unfollw = (target_name) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    const user = localStorage.getItem('id');
    const body = JSON.stringify({ user, target_name });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/accounts/follow/`,
        body,
        config
      );
      dispatch({
        type: FOLLOW_SUCCESS,
      });
      dispatch(load_profile(target_name));
    } catch (err) {
      dispatch({
        type: FOLLOW_FAIL,
      });
    }
  }
};

export const set_resume_detail =
  (
    id,
    profile_name,
    name,
    phone_no,
    birth_date,
    show_resume,
    military_service,
    address,
    bio
  ) =>
  async (dispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };
      const body = JSON.stringify({
        id,
        profile_name,
        name,
        phone_no,
        birth_date,
        show_resume,
        military_service,
        address,
        bio,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/accounts/user-set/`,
          body,
          config
        );

        dispatch({
          type: SET_USER_DETAIL_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        if (error.request.status === 400) {
          dispatch({
            type: SET_USER_DETAIL_FAIL,
            payload: JSON.parse(error.request.response),
          });
        } else {
          dispatch({
            type: SET_USER_DETAIL_FAIL,
            payload: { error: 'unknown error' },
          });
        }
      }
    } else {
      dispatch({
        type: SET_USER_DETAIL_FAIL,
      });
    }
  };
export const set_user_detail =
  (id, name, profile_name, bio) => async (dispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };
      const body = JSON.stringify({
        id,
        name,
        profile_name,
        bio,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/accounts/user-set/`,
          body,
          config
        );

        dispatch({
          type: SET_USER_DETAIL_SUCCESS,
          payload: res.data,
        });
        dispatch(load_user());
      } catch (error) {
        if (error.request.status === 400) {
          dispatch({
            type: SET_USER_DETAIL_FAIL,
            payload: JSON.parse(error.request.response),
          });
        } else {
          dispatch({
            type: SET_USER_DETAIL_FAIL,
            payload: { error: 'unknown error' },
          });
        }
      }
    } else {
      dispatch({
        type: SET_USER_DETAIL_FAIL,
      });
    }
  };

export const checkAuthenticated = () => async (dispatch) => {
  if (typeof window == 'undefined') {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem('access') });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (error) {
    if (error.request.status === 401) {
      dispatch({
        type: LOGIN_FAIL,
        payload: JSON.parse(error.request.response),
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: 'unknown error' },
      });
    }
  }
};

export const signup =
  (name, email, password, re_password) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password, re_password });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      // console.log("request.status", error.request.status);
      // console.log("request.response", error.request.response);
      // console.log("message", error.message);
      if (error.request.status === 400) {
        dispatch({
          type: SIGNUP_FAIL,
          payload: JSON.parse(error.request.response),
        });
      } else {
        dispatch({
          type: SIGNUP_FAIL,
          payload: { error: 'unknown error' },
        });
      }
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: RESET_PASSWORD_CONFIRM_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      if (error.request.status === 400) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
          payload: JSON.parse(error.request.response),
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
          payload: { error: 'unknown error' },
        });
      }
    }
  };
export const set_email =
  (new_email, re_new_email, current_password) => async (dispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };

      const body = JSON.stringify({
        new_email,
        re_new_email,
        current_password,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/users/set_email/`,
          body,
          config
        );
        dispatch({
          type: SET_EMAIL_SUCCESS,
        });
        dispatch(load_user());
      } catch (error) {
        if (error.request.status === 400) {
          dispatch({
            type: SET_EMAIL_FAIL,
            payload: JSON.parse(error.request.response),
          });
        } else {
          dispatch({
            type: SET_EMAIL_FAIL,
            payload: { error: 'unknown error' },
          });
        }
      }
    }
  };
export const set_password =
  (new_password, re_new_password, current_password) => async (dispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };

      const body = JSON.stringify({
        new_password,
        re_new_password,
        current_password,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/users/set_password/`,
          body,
          config
        );
        dispatch({
          type: SET_PASSWORD_SUCCESS,
        });
      } catch (error) {
        if (error.request.status === 400) {
          dispatch({
            type: SET_PASSWORD_FAIL,
            payload: JSON.parse(error.request.response),
          });
        } else {
          dispatch({
            type: SET_PASSWORD_FAIL,
            payload: { error: 'unknown error' },
          });
        }
      }
    }
  };
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
