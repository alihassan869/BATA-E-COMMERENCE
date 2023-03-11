export const ADD = (item) => {
  return {
    type: 'ADD-CART',
    payload: item,
  };
};
// Remove Many
export const DeleteMany = (id) => {
  return {
    type: 'DLT-CART',
    payload: id,
  };
};
// Remove one
export const DeleteOne = (item) => {
  return {
    type: 'DLTOne-CART',
    payload: item,
  };
};
// Search
export const Search = (item) => {
  // console.log(item);
  return {
    type: 'Search_item',
    payload: item,
  };
};
