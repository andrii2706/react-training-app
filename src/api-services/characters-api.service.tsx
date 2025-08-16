const apiRaw = 'https://rickandmortyapi.com/api';

export const getCharactersFromBe = (page: number) => {
  return fetch(`${apiRaw}/character?page=${page}`).then(response => response.json());
};
// export const getCharaterFromBe = (id: number) => {
//   return fetch(`${apiRaw}/character/${id}`).then(response => response.json());
// };
