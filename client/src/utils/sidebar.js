export const mapChatToLink = (type, id) => `/${type}/${id}/chat`;

const mapFlashCardSetToLink = (id, name, resource, resourceId) => ({
  link: `/${resource}/${resourceId}/flash-card-sets/${id}`,
  name
});

const mapStudyGroupToLink = (id, name) => ({
  link: `/study-groups/${id}`,
  name
});

export const mapFlashCardSetsToLinks = (flashCardSets, resource, resourceId) =>
  (flashCardSets || []).map(({ id, name }) =>
    mapFlashCardSetToLink(id, name, resource, resourceId)
  ).filter(({ link, name }) => link && name);

  export const mapStudyGroupsToLinks = (studyGroups) =>
    (studyGroups || []).map(({ id, name }) =>
      mapStudyGroupToLink(id, name)
    ).filter(({ link, name }) => link && name);
