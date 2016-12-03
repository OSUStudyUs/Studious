import {
  MEMBERSHIP_APPROVE_SUCCESS,
  MEMBERSHIP_DENY_SUCCESS,
  STUDY_GROUP_CREATION_SUCCESS,
  STUDY_GROUP_LOAD_SUCCESS,
  STUDY_GROUPS_LOAD_REQUEST,
  STUDY_GROUPS_LOAD_SUCCESS
} from './actions';
import * as profileActions from '../profile/actions';
import * as flashCardSetActions from '../flash_card_set/actions';

const { CREATE_FLASH_CARD_SET_SUCCESS } = flashCardSetActions;
const { PROFILE_LOAD_SUCCESS } = profileActions;
const initialState = {
  loading: false,
  byId: { }
};

const studyGroup = (state = initialState, { type, payload }) => {
  const newState = { ...state };
  let byId, newPayload, flashCardSetIds, userIds, memberIds, pendingIds;

  switch (type) {
    case MEMBERSHIP_APPROVE_SUCCESS:
      let { id: userId, membershipId } = payload.user;

      Object.keys(newState.byId).forEach((id) => {
        if (newState.byId[id].pendingIds.some(({ id: uId, membershipId: mId}) => uId === userId && mId === membershipId )) {
          newState.byId[id] = {
            ...newState.byId[id],
            memberIds: newState.byId[id].memberIds.concat({ id: userId, membershipId }),
            pendingIds: newState.byId[id].pendingIds.filter((pId) => pId !== userId)
          };
        }
      });
      return newState;
    case MEMBERSHIP_DENY_SUCCESS:
      userId = payload.user.id;
      membershipId = payload.user.membershipId;

      Object.keys(newState.byId).forEach((id) => {
        if (newState.byId[id].pendingIds.some(({ id: uId, membershipId: mId}) => uId === userId && mId === membershipId )) {
          newState.byId[id] = {
            ...newState.byId[id],
            pendingIds: newState.byId[id].pendingIds.filter(({ id: pId}) => pId !== userId)
          };
        }
      });
      return newState;

    case CREATE_FLASH_CARD_SET_SUCCESS:
      const { studyGroupId } = payload.flashCardSet;

      if (newState.byId[studyGroupId]) {
        newState.byId[studyGroupId].flashCardSetIds =
          (newState.byId[studyGroupId].flashCardSetIds || []).concat(payload.flashCardSet.id);
        return newState;
      } else {
        return newState;
      }
    case PROFILE_LOAD_SUCCESS:
      byId = payload.studyGroups.reduce((acc, group) => {
        const newGroup = { ...group };
        const { id } = newGroup;

        flashCardSetIds = newGroup.flashCardSets.map(({ id }) => id);

        delete newGroup.flashCardSets;

        acc[id] = { ...newGroup, flashCardSetIds };
        return acc;
      }, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId
        }
      };
    case STUDY_GROUP_CREATION_SUCCESS:
      newState.byId[payload.studyGroup.id] = {
        ...newState.byId[payload.studyGroup.id],
        ...payload.studyGroup
      };

      return newState;
    case STUDY_GROUP_LOAD_SUCCESS:
      newPayload = { ...payload.studyGroup };

      flashCardSetIds = newPayload.flashCardSets.map(({ id }) => id);
      memberIds = newPayload.users.filter(({ pending }) => !pending).map(({ id, membershipId }) => ({ id, membershipId }));
      pendingIds = newPayload.users.filter(({ pending }) => pending).map(({ id, membershipId }) => ({ id, membershipId }));

      delete newPayload.flashCardSets;
      delete newPayload.users;

      byId = {
        ...newPayload,
        flashCardSetIds,
        memberIds,
        pendingIds
      };

      newState.byId[newPayload.id] = {
        ...newState.byId[newPayload.id],
        ...byId
      };

      return newState;
    case STUDY_GROUPS_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case STUDY_GROUPS_LOAD_SUCCESS:
      byId = payload.studyGroups.reduce((acc, group) => {
        const newGroup = { ...group };
        const { id } = newGroup;

        flashCardSetIds = newGroup.flashCardSets.map(({ id }) => id);
        memberIds = newPayload.users.filter(({ pending }) => !pending).map(({ id, membershipId }) => ({ id, membershipId }));
        pendingIds = newPayload.users.filter(({ pending }) => pending).map(({ id, membershipId }) => ({ id, membershipId }));

        const courseId = newGroup.course.id;

        delete newGroup.flashCardSets;
        delete newGroup.users;
        delete newGroup.course;

        acc[id] = { ...newGroup, courseId, flashCardSetIds, userIds };
        return acc;
      }, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          ...byId
        },
        loading: false
      };
    default:
      return state;
  }
};

export default studyGroup;
