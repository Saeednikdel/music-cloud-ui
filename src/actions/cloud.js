import {
  FAVE_FAIL,
  FAVE_SUCCESS,
  LOAD_CARD_POST_SUCCESS,
  LOAD_FAVE_FAIL,
  LOAD_FAVE_SUCCESS,
  LOAD_FOLLOWER_FAIL,
  LOAD_FOLLOWER_SUCCESS,
  LOAD_FOLLOWING_FAIL,
  LOAD_FOLLOWING_SUCCESS,
  LOAD_NOW_PLAYING_FAIL,
  LOAD_NOW_PLAYING_SUCCESS,
  LOAD_PLAYLIST_FAIL,
  LOAD_PLAYLIST_SUCCESS,
  LOAD_POSTS_FAIL,
  LOAD_POSTS_SUCCESS,
  LOAD_POST_FAIL,
  LOAD_POST_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_USERS_FAIL,
  LOAD_USERS_SUCCESS,
  LOAD_USER_FAVS_FAIL,
  LOAD_USER_FAVS_SUCCESS,
  LOAD_USER_PLAYLISTS_FAIL,
  LOAD_USER_PLAYLISTS_SUCCESS,
  LOAD_USER_POSTS_FAIL,
  LOAD_USER_POSTS_SUCCESS,
  LOGOUT,
  REMOVE_POST_FAIL,
  REMOVE_POST_SUCCESS,
  SET_NOW_PLAYING_SUCCESS,
  REMOVE_FROM_PLAYLIST_SUCCESS,
  REMOVE_FROM_PLAYLIST_FAIL,
  LOAD_GENRE_SUCCESS,
  LOAD_GENRE_FAIL,
} from './types';

import axios from 'axios';

export const load_genre = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cloud/genre-list/`,

      config
    );
    dispatch({
      type: LOAD_GENRE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_GENRE_FAIL,
    });
  }
};

export const remove_from_playlist = (post, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  const user = localStorage.getItem('id');
  const body = JSON.stringify({
    user,
    post,
    id,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cloud/removefromplaylist/`,
      body,
      config
    );
    dispatch({
      type: REMOVE_FROM_PLAYLIST_SUCCESS,
      payload: { post },
    });
  } catch (err) {
    dispatch({
      type: REMOVE_FROM_PLAYLIST_FAIL,
    });
  }
};
export const remove_post = (source, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  const user = localStorage.getItem('id');

  const body = JSON.stringify({
    user,
    id,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cloud/removepost/`,
      body,
      config
    );
    dispatch({
      type: REMOVE_POST_SUCCESS,
      payload: { source, id },
    });
  } catch (err) {
    dispatch({
      type: REMOVE_POST_FAIL,
    });
  }
};

export const set_now_playing = (source) => async (dispatch) => {
  dispatch({
    type: SET_NOW_PLAYING_SUCCESS,
    payload: source,
  });
};
export const load_now_playing =
  (source, page, user_name, playlistid) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const user = localStorage.getItem('id')
      ? localStorage.getItem('id')
      : false;
    const body = JSON.stringify({
      page,
      user,
    });
    try {
      if (source === 'home') {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/cloud/postlist/${page}/`,
          body,
          config
        );
        dispatch({
          type: LOAD_NOW_PLAYING_SUCCESS,
          payload: res.data,
          page: page,
        });
      }
      if (source === 'userpostlist') {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cloud/userpostlist/${user_name}/${page}/`,
          config
        );
        dispatch({
          type: LOAD_NOW_PLAYING_SUCCESS,
          payload: res.data,
          page: page,
        });
      }
      if (source === 'userfavorites') {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cloud/userfavorites/${user_name}/${page}/`,
          config
        );
        dispatch({
          type: LOAD_NOW_PLAYING_SUCCESS,
          payload: res.data,
          page: page,
        });
      }
      if (source === 'playlist') {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/cloud/playlist/${playlistid}/${page}/`,
          config
        );
        dispatch({
          type: LOAD_NOW_PLAYING_SUCCESS,
          payload: res.data,
          page: page,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_NOW_PLAYING_FAIL,
      });
    }
  };

export const load_users = (page, keyword) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const body = JSON.stringify({
    keyword,
    page,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/accounts/user-list/${page}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_USERS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USERS_FAIL,
    });
  }
};

export const load_posts = (page, keyword, genre) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const user = localStorage.getItem('id') ? localStorage.getItem('id') : false;
  const body = JSON.stringify({
    keyword,
    page,
    user,
    genre,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cloud/postlist/${page}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_POSTS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_POSTS_FAIL,
    });
  }
};

export const load_user_favorites = (user_name, page) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cloud/userfavorites/${user_name}/${page}/`,
      config
    );
    dispatch({
      type: LOAD_USER_FAVS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAVS_FAIL,
    });
  }
};
export const load_user_playlists = (user_name, page) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cloud/userplaylists/${user_name}/${page}/`,
      config
    );
    dispatch({
      type: LOAD_USER_PLAYLISTS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_PLAYLISTS_FAIL,
    });
  }
};

export const load_playlist = (id, page) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cloud/playlist/${id}/${page}/`,
      config
    );
    dispatch({
      type: LOAD_PLAYLIST_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_PLAYLIST_FAIL,
    });
  }
};
export const load_user_posts = (name, page) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cloud/userpostlist/${name}/${page}/`,
      config
    );
    dispatch({
      type: LOAD_USER_POSTS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_POSTS_FAIL,
    });
  }
};

export const load_post = (postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const user = localStorage.getItem('id') ? localStorage.getItem('id') : false;
  const body = JSON.stringify({ user });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cloud/post/${postId}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_POST_FAIL,
    });
  }
};
export const load_card_post = (postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const user = localStorage.getItem('id') ? localStorage.getItem('id') : false;
  const body = JSON.stringify({ user });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cloud/post/${postId}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_CARD_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {}
};
export const load_profile = (name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const user = localStorage.getItem('id');
  const body = JSON.stringify({ user, name });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cloud/profile-detail/`,
      body,
      config
    );

    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_FAIL,
    });
  }
};

export const load_likes =
  (postId, page = 1) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cloud/like-list/${postId}/${page}/`,
        config
      );
      dispatch({
        type: LOAD_FAVE_SUCCESS,
        payload: res.data,
        page: page,
      });
    } catch (err) {
      dispatch({
        type: LOAD_FAVE_FAIL,
      });
    }
  };

export const load_follower =
  (postId, page = 1) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cloud/follower-list/${postId}/${page}/`,
        config
      );
      dispatch({
        type: LOAD_FOLLOWER_SUCCESS,
        payload: res.data,
        page: page,
      });
    } catch (err) {
      dispatch({
        type: LOAD_FOLLOWER_FAIL,
      });
    }
  };

export const load_following =
  (postId, page = 1) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cloud/following-list/${postId}/${page}/`,
        config
      );
      dispatch({
        type: LOAD_FOLLOWING_SUCCESS,
        payload: res.data,
        page: page,
      });
    } catch (err) {
      dispatch({
        type: LOAD_FOLLOWING_FAIL,
      });
    }
  };
export const favorite = (id) => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    const user = localStorage.getItem('id');
    const body = JSON.stringify({ user, id });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cloud/favorite/`,
        body,
        config
      );
      dispatch({
        type: FAVE_SUCCESS,
        payload: res.data,
      });
      dispatch(load_likes(id, 1));
      // dispatch(load_likes(id));
    } catch (err) {
      dispatch({
        type: FAVE_FAIL,
      });
    }
  } else {
    dispatch({
      type: FAVE_FAIL,
    });
  }
};
