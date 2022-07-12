import {
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  LOAD_FAVE_SUCCESS,
  LOAD_FAVE_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAIL,
  LOAD_FOLLOWER_SUCCESS,
  LOAD_FOLLOWER_FAIL,
  LOAD_FOLLOWING_SUCCESS,
  LOAD_FOLLOWING_FAIL,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAIL,
  LOAD_USER_FAVS_SUCCESS,
  LOAD_USER_FAVS_FAIL,
  FAVE_SUCCESS,
  FAVE_FAIL,
  LOAD_NOW_PLAYING_SUCCESS,
  LOAD_NOW_PLAYING_FAIL,
  SET_NOW_PLAYING_SUCCESS,
  LOAD_CARD_POST_SUCCESS,
} from '../actions/types';
const initialState = {
  posts: [],
  count: null,
  userposts: [],
  profile_count: null,
  likes: [],
  follower: [],
  following: [],
  post: null,
  now_playing: [],
  userfavs: [],
  fav_count: null,
  now_playing_count: 0,
};

export default function (state = initialState, action) {
  const { type, payload, page } = action;

  switch (type) {
    case SET_NOW_PLAYING_SUCCESS:
      if (payload === 'home') {
        return {
          ...state,
          now_playing: state.posts,
          now_playing_count: state.count,
        };
      } else if (payload === 'userpostlist') {
        return {
          ...state,
          now_playing: state.userposts,
          now_playing_count: state.profile_count,
        };
      } else if (payload === 'userfavorites') {
        return {
          ...state,
          now_playing: state.userfavs,
          now_playing_count: state.fav_count,
        };
      }
    case LOAD_NOW_PLAYING_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          now_playing: payload.posts,
          now_playing_count: payload.count,
        };
      } else {
        return {
          ...state,
          now_playing: state.now_playing.concat(payload.posts),
          now_playing_count: payload.count,
        };
      }
    case LOAD_POSTS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          posts: payload.posts,
          count: payload.count,
        };
      } else {
        return {
          ...state,
          posts: state.posts.concat(payload.posts),
          count: payload.count,
        };
      }
    case LOAD_USERS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          users: payload.users,
          users_count: payload.count,
        };
      } else {
        return {
          ...state,
          users: state.users.concat(payload.users),
          users_count: payload.count,
        };
      }
    case LOAD_USER_POSTS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          userposts: payload.posts,
          profile_count: payload.count,
        };
      } else {
        return {
          ...state,
          userposts: state.userposts.concat(payload.posts),
          profile_count: payload.count,
        };
      }

    case LOAD_USER_FAVS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          userfavs: payload.posts,
          fav_count: payload.count,
        };
      } else {
        return {
          ...state,
          userfavs: state.userfavs.concat(payload.posts),
          fav_count: payload.count,
        };
      }
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        post: payload,
      };
    case LOAD_CARD_POST_SUCCESS:
      return {
        ...state,
        card_post: payload,
      };
    case FAVE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          favorite: !state.post.favorite,
          like: state.post.favorite ? state.post.like - 1 : state.post.like + 1,
        },
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    case LOAD_FAVE_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          likes: payload.likes,
          like_count: payload.count,
        };
      } else {
        return {
          ...state,
          likes: state.likes.concat(payload.likes),
          like_count: payload.count,
        };
      }
    case LOAD_FOLLOWER_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          follower: payload.follower,
          follower_count: payload.count,
        };
      } else {
        return {
          ...state,
          follower: state.follower.concat(payload.follower),
          follower_count: payload.count,
        };
      }
    case LOAD_FOLLOWING_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          following: payload.following,
          following_count: payload.count,
        };
      } else {
        return {
          ...state,
          following: state.following.concat(payload.following),
          following_count: payload.count,
        };
      }
    case LOAD_POSTS_FAIL:
    case LOAD_USERS_FAIL:
    case LOAD_POST_FAIL:
    case LOAD_FAVE_FAIL:
    case LOAD_FOLLOWER_FAIL:
    case LOAD_FOLLOWING_FAIL:
    case LOAD_PROFILE_FAIL:
    case LOAD_USER_POSTS_FAIL:
    case LOAD_USER_FAVS_FAIL:
    default:
      return state;
  }
}
