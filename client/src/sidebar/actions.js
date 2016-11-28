export const SIDEBAR_UPDATE = 'SIDEBAR_UPDATE';

export const updateSidebar = (links) =>
  (dispatch) => dispatch({
    type: 'SIDEBAR_UPDATE',
    payload: links
  });
