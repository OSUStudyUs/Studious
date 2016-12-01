import { NAME } from './constants';

const shouldUpdateLinks = (oldLinks, newLinks) =>
  newLinks.length > 0 && newLinks.some(({ link }) => typeof oldLinks.find(({ link: oldLink }) => oldLink === link) === 'undefined');

export const sidebar = (state) => state[NAME];
export const shouldUpdateChatLink = (state, chatLink) => state[NAME].chatLink !== chatLink;
export const shouldUpdateFlashCardSetLinks = (state, flashCardSetLinks) =>
  shouldUpdateLinks(state[NAME].flashCardSetLinks, Array.from(flashCardSetLinks));
export const shouldUpdateStudyGroupLinks = (state, studyGroupLinks) =>
  shouldUpdateLinks(state[NAME].studyGroupLinks, Array.from(studyGroupLinks));
