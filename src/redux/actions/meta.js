import { UPDATE_META } from './types';

const updateMeta = meta => ({ type: UPDATE_META, payload: meta });

export { updateMeta };
