const orderWithDate = (array) => {
  return array.sort((a, b) => {
    if (new Date(a.fecha) < new Date(b.fecha)) {
      return 1;
    }
    if (new Date(a.fecha) > new Date(b.fecha)) {
      return -1;
    }
    return 0;
  });
}
export {
  orderWithDate
}