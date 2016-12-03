import { api } from '../utils';

export const MEMBERSHIP_APPROVE_FAILURE = 'MEMBERSHIP_APPROVE_FAILURE';
export const MEMBERSHIP_APPROVE_REQUEST = 'MEMBERSHIP_APPROVE_REQUEST';
export const MEMBERSHIP_APPROVE_SUCCESS = 'MEMBERSHIP_APPROVE_SUCCESS';
export const MEMBERSHIP_DENY_FAILURE = 'MEMBERSHIP_DENY_FAILURE';
export const MEMBERSHIP_DENY_REQUEST = 'MEMBERSHIP_DENY_REQUEST';
export const MEMBERSHIP_DENY_SUCCESS = 'MEMBERSHIP_DENY_SUCCESS';
export const STUDY_GROUP_CREATION_FAILURE = 'STUDY_GROUP_CREATION_FAILURE';
export const STUDY_GROUP_CREATION_REQUEST = 'STUDY_GROUP_CREATION_REQUEST';
export const STUDY_GROUP_CREATION_SUCCESS = 'STUDY_GROUP_CREATION_SUCCESS';
export const STUDY_GROUP_LOAD_FAILURE = 'STUDY_GROUP_LOAD_FAILURE';
export const STUDY_GROUP_LOAD_REQUEST = 'STUDY_GROUP_LOAD_REQUEST';
export const STUDY_GROUP_LOAD_SUCCESS = 'STUDY_GROUP_LOAD_SUCCESS';
export const STUDY_GROUPS_LOAD_FAILURE = 'STUDY_GROUPS_LOAD_FAILURE';
export const STUDY_GROUPS_LOAD_REQUEST = 'STUDY_GROUPS_LOAD_REQUEST';
export const STUDY_GROUPS_LOAD_SUCCESS = 'STUDY_GROUPS_LOAD_SUCCESS';

const onApproveFailure = (errors) => ({
  type: MEMBERSHIP_APPROVE_FAILURE,
  payload: errors
});

const onApproveRequest = (membershipId) => ({
  type: MEMBERSHIP_APPROVE_REQUEST,
  payload: {
    membershipId
  }
});

const onApproveSuccess = (user) => ({
  type: MEMBERSHIP_APPROVE_SUCCESS,
  payload: {
    user
  }
});

const onDenyFailure = (errors) => ({
  type: MEMBERSHIP_DENY_FAILURE,
  payload: errors
});

const onDenyRequest = (membershipId) => ({
  type: MEMBERSHIP_DENY_REQUEST,
  payload: {
    membershipId
  }
});

const onDenySuccess = (user) => ({
  type: MEMBERSHIP_DENY_SUCCESS,
  payload: {
    user
  }
});

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
  payload: errors
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

const onStudyGroupsLoadFailure = (errors) => ({
  type: STUDY_GROUPS_LOAD_FAILURE,
  payload: errors
});

const onStudyGroupsLoadRequest = () => ({
  type: STUDY_GROUPS_LOAD_REQUEST,
  payload: {}
});

const onStudyGroupsLoadSuccess = (studyGroups) => ({
  type: STUDY_GROUPS_LOAD_SUCCESS,
  payload: {
    studyGroups
  }
});

export const approveMembership = (membershipId) =>
  (dispatch) => {
    dispatch(onApproveRequest(membershipId));
    api.put(`/memberships/${membershipId}/approve`)
      .then((user) => {
        dispatch(onApproveSuccess(user));
      })
      .catch((errors) => {
        dispatch(onApproveFailure(errors));
      });
  };

export const denyMembership = (membershipId) =>
  (dispatch) => {
    dispatch(onDenyRequest(membershipId));
    api.del(`/memberships/${membershipId}`)
      .then((user) => {
        dispatch(onDenySuccess(user));
      })
      .catch((errors) => {
        dispatch(onDenyFailure(errors));
      });
  };

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

export const loadStudyGroups = () =>
  (dispatch) => {
    dispatch(onStudyGroupsLoadRequest());
    api.get(`/study_groups`)
      .then(({ studyGroups }) => {
        dispatch(onStudyGroupsLoadSuccess(studyGroups));
      })
      .catch((errors) => {
        dispatch(onStudyGroupsLoadFailure(errors));
      });
  };
