const sortTypes = (typeSort, userData, functionGetData) => {
  if (typeSort == "default") {
    setCurrentSort("down");
    const sorted = [...userData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
    setUserData(sorted);
  } else if (typeSort == "down") {
    setCurrentSort("up");
    const sorted = [...userData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
    setUserData(sorted);
  } else if (typeSort == "up") {
    setCurrentSort("default");
    functionGetData();
  }
};
export default sortTypes;
