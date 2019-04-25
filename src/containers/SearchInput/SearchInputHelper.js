export function filterSearchResults(searchText, data) {
  return data.filter(user => {
    const searchValue =  Object.values(user).find(value =>
      (value || '')
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    user.searchValue = searchValue;
    return searchValue;
  });
}