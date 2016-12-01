export const mapChatToLink = (type, id) => `/${type}/${id}/chat`;

export const mapFlashCardSetsToLinks = (flashCardSets, resourceId, resource) => (flashCardSets || []).map(({ id, name }) => ({
  link: `/${resource}/${resourceId}/flash-card-sets/${id}`,
  name
})).concat({ link: `/${resource}/${resourceId}/flash-card-sets/new`, name: '+'});

export const mapStudyGroupsToLinks = (studyGroups) => (studyGroups || []).map(({ id, name }) => ({
  link: `/study-groups/${id}`,
  name
}));
