import {
  SIDEBAR_UPDATE_CHAT_LINK, SIDEBAR_UPDATE_FLASH_CARD_SET_LINKS, SIDEBAR_UPDATE_STUDY_GROUP_LINKS
} from './actions';


const initialState = {
  chatLink: null,
  flashCardSetLinks: [],
  studyGroupLinks: []
};

const linkIndexOf = (links, { link }) => {
  for (let i = 0; i < links.length; i++) {
    if (links[i].link === link) return i;
  }
  return -1;
};

const sidebar = (state = initialState, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case SIDEBAR_UPDATE_CHAT_LINK:
      newState.chatLink = payload;

      return newState;
    case SIDEBAR_UPDATE_FLASH_CARD_SET_LINKS:
      let newFlashcardSetLinks = newState.flashCardSetLinks.concat(payload);

      newFlashcardSetLinks = newFlashcardSetLinks.filter((link, position, links) => linkIndexOf(links, link) === position).sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB));

      newState.studyGroupLinks = newFlashcardSetLinks;
      return newState;
    case SIDEBAR_UPDATE_STUDY_GROUP_LINKS:
      let newStudyGroupLinks = newState.studyGroupLinks.concat(payload);

      newStudyGroupLinks = newStudyGroupLinks.filter((link, position, links) => linkIndexOf(links, link) === position).sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB));

      newState.studyGroupLinks = newStudyGroupLinks;
      return newState;
    default:
      return state;
  }
};

export default sidebar;
