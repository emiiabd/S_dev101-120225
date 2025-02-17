const orderWithDate = (array) => {
  return array.sort((a, b) => {
    if (new Date(a) < new Date(b)) {
      return 1;
    }
    if (new Date(a) > new Date(b)) {
      return -1;
    }
    return 0;
  });
}
export {
  orderWithDate
}