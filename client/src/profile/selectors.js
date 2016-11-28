import { NAME } from './constants';

export const courses = (state) => state[NAME].courses;
export const flashCardSets = (state) => state[NAME].flashCardSets;
export const profileLoaded = (state) => Object.keys(state[NAME]).every((key) => state[NAME][key] !== null);
export const studyGroups = (state) => state[NAME].studyGroups;
