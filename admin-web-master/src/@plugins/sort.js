// type === true > 오름차순, false > 내림차순
export default (array, type, column) => {
  if (type === false) {
    array.sort((a, b) => {
      if (a[`${column}`] < b[`${column}`]) {
        return -1;
      } else if (a[`${column}`] > b[`${column}`]) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (type === true) {
    array.sort((a, b) => {
      if (a[`${column}`] > b[`${column}`]) {
        return -1;
      } else if (a[`${column}`] < b[`${column}`]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  return array;
};
