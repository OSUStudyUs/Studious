export const SIDEBAR_UPDATE_FLASH_CARD_SET_LINKS = 'SIDEBAR_UPDATE_FLASH_CARD_SET_LINKS';
export const SIDEBAR_UPDATE_STUDY_GROUP_LINKS = 'SIDEBAR_UPDATE_STUDY_GROUP_LINKS';
export const SIDEBAR_UPDATE_CHAT_LINK = 'SIDEBAR_UPDATE_CHAT_LINK';

export const updateChatLink = (link) =>
  (dispatch) => dispatch({
    type: SIDEBAR_UPDATE_CHAT_LINK,
    payload: link
  });

export const updateFlashcardSetLinks = (links) =>
  (dispatch) => dispatch({
    type: SIDEBAR_UPDATE_FLASH_CARD_SET_LINKS,
    payload: links
  });

  export const updateStudyGroupLinks = (links) =>
    (dispatch) => dispatch({
      type: SIDEBAR_UPDATE_STUDY_GROUP_LINKS,
      payload: links
    });
