const apiRaw = 'https://rickandmortyapi.com/api';

export const getEpisodes = () => {
  return fetch(`${apiRaw}/episode`).then(response => response.json());
};
export const getEpisode = (id: number) => {
  return fetch(`${apiRaw}/episode/${id}`).then(response => response.json());
};
