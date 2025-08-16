const apiRaw = 'https://rickandmortyapi.com/api';

export const getEpisodes = (page: number) => {
  return fetch(`${apiRaw}/episode?page=${page}`).then(response => response.json());
};
export const getEpisode = (id: number) => {
  return fetch(`${apiRaw}/episode/${id}`).then(response => response.json());
};
