import { NAME } from './constants';

export const byIds = (state, ids) => ids.map((id) => state[NAME].byId[id]);
