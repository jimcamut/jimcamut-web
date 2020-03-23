import { UPDATE_GRAMS, SET_GRAMS } from './types';

const updateGrams = data => ({ type: UPDATE_GRAMS, payload: data });
const setGrams = data => ({ type: SET_GRAMS, payload: data });

export { updateGrams, setGrams };
