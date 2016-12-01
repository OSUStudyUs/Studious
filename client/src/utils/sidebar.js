export const mapChatToLink = (type, id) => `/${type}/${id}/chat`;

export const mapFlashCardSetsToLinks = (flashCardSets, userId) => (flashCardSets || []).map(({ id, name }) => ({
  link: `/users/${userId}/flash-card-sets/${id}`,
  name
}));

export const mapStudyGroupsToLinks = (studyGroups) => (studyGroups || []).map(({ id, name }) => ({
  link: `/study-groups/${id}`,
  name
}));
