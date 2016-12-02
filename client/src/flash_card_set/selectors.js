import { NAME } from './constants';

export const flashCardSet = (state, id) => state[NAME].byId[id];
export const byIds = (state, ids) => ids.map((id) => state[NAME].byId[id]);
