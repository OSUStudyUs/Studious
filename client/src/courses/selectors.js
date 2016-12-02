import { NAME } from './constants';
import { searchUtils } from '../utils';

export const courseById = (state, id) => state[NAME].byId[id];
export const coursesLoading = (state) => state[NAME].loading;
export const searchForCourses = (state, query) => searchUtils.searchById(state[NAME].byId, query);
