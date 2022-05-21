export const getLocationsStorage = () => {
  const storagedLocations = localStorage.getItem('@LocationsViaCep');

  if (storagedLocations) {
    return JSON.parse(storagedLocations);
  }

  return [];
};

export const addLocationsOnStorage = (newLocations) => {
  const storagedLocations = getLocationsStorage();

  const newLocationsToAdd = [...storagedLocations, ...newLocations];
  localStorage.setItem('@LocationsViaCep', JSON.stringify(newLocationsToAdd));
};

export const removeLocationFromStorage = (zipCode) => {
  const storagedLocations = getLocationsStorage();

  const updatedLocations = storagedLocations.filter((location) => location.zipCode !== zipCode);
  localStorage.setItem('@LocationsViaCep', JSON.stringify(updatedLocations));
};
