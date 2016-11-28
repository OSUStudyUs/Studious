import { api } from '../utils';

export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD_REQUEST';
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS';

const loadProfileRequest = (id) => ({
  type: PROFILE_LOAD_REQUEST,
  payload: id
});

const receiveProfile = (profile) => ({
  type: PROFILE_LOAD_SUCCESS,
  payload: profile
});

export const loadProfile = (id) =>
  (dispatch) => {
    dispatch(loadProfileRequest(id));
    api.get(`/users/${id}`)
      .then((profile) => {
        dispatch(receiveProfile(profile));
      });
  };
