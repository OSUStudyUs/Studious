import { NAME } from './constants';

export const messagesById = (state, id) => state[NAME].byId[id] && state[NAME].byId[id].messages;
export const subscriptionById = (state, id) => state[NAME].byId[id] && state[NAME].byId[id].subscription;
