const apiRaw = 'https://rickandmortyapi.com/api';

export const getLocations = () => {
  return fetch(`${apiRaw}/location`).then(response => response.json());
};

export const getLocation = (id: number) => {
  return fetch(`${apiRaw}/location/${id}`).then(response => response.json());
};
