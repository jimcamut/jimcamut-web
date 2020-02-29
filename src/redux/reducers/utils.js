import _ from "lodash";

export const addToList = (list, addTo, identifier = "id") => {
  return _.uniq([...list, ...addTo], identifier);
};

export const updateListItem = (list, item) => {
  const idx = list.findIndex(it => it.objectId === item.objectId);
  let newList = Object.assign([], list);
  if (idx > -1) {
    newList[idx] = item;
  } else {
    newList.push(item);
  }
  return newList;
};

export const mergeListItem = (list, item) => {
  const idx = list.findIndex(it => it.objectId === item.objectId);
  let newList = Object.assign([], list);
  if (idx > -1) {
    newList[idx] = Object.assign({}, newList[idx], item);
  }
  return newList;
};

export const removeFromList = ({ list, item, id }) => {
  return Object.assign([], list).filter(
    it => it && it.objectId !== (id || (item && item.objectId))
  );
};
