import { api } from '../utils';

export const STUDY_GROUP_CREATION_FAILURE = 'STUDY_GROUP_CREATION_FAILURE';
export const STUDY_GROUP_CREATION_REQUEST = 'STUDY_GROUP_CREATION_REQUEST';
export const STUDY_GROUP_CREATION_SUCCESS = 'STUDY_GROUP_CREATION_SUCCESS';
export const STUDY_GROUP_LOAD_FAILURE = 'STUDY_GROUP_LOAD_FAILURE';
export const STUDY_GROUP_LOAD_REQUEST = 'STUDY_GROUP_LOAD_REQUEST';
export const STUDY_GROUP_LOAD_SUCCESS = 'STUDY_GROUP_LOAD_SUCCESS';

const onCreationFailure = (errors) => ({
  type: STUDY_GROUP_CREATION_FAILURE,
  payload: {
    errors
  }
});

const onCreationRequest = (studyGroup) => ({
  type: STUDY_GROUP_CREATION_REQUEST,
  payload: {
    studyGroup
  }
});

const onCreationSuccess = (studyGroup) => ({
  type: STUDY_GROUP_CREATION_SUCCESS,
  payload: {
    studyGroup
  }
});

const onLoadFailure = (errors) => ({
  type: STUDY_GROUP_LOAD_FAILURE,
  payload: {
    errors
  }
});

const onLoadRequest = (id) => ({
  type: STUDY_GROUP_LOAD_REQUEST,
  payload: {
    id
  }
});

const onLoadSuccess = (studyGroup) => ({
  type: STUDY_GROUP_LOAD_SUCCESS,
  payload: {
    studyGroup
  }
});

export const createStudyGroup = (studyGroup) =>
  (dispatch) => {
    dispatch(onCreationRequest(studyGroup));
    api.post('/study_groups', { studyGroup })
      .then((group) => {
        dispatch(onCreationSuccess(group));
      })
      .catch((errors) => {
        dispatch(onCreationFailure(errors));
      });
  };

export const loadStudyGroup = (id) =>
  (dispatch) => {
    dispatch(onLoadRequest(id));
    api.get(`/study_groups/${id}`)
      .then((studyGroup) => {
        dispatch(onLoadSuccess(studyGroup));
      })
      .catch((errors) => {
        dispatch(onLoadFailure(errors));
      });
  };
