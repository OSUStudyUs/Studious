import { NAME } from './constants';
import { searchUtils } from '../utils';

export const byId = (state, id) => state[NAME].byId[id];
export const byIds = (state, ids) => ids.map((id) => state[NAME].byId[id]);
export const loading = (state) => state[NAME].loading;
export const memberIds = (state, id) => state[NAME].byId[id].memberIds;
export const pendingIds = (state, id) => state[NAME].byId[id].pendingIds;
export const search = (state, query) => searchUtils.searchById(state[NAME].byId, query);
