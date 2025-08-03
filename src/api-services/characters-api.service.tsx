const apiRaw = 'https://rickandmortyapi.com/api';

export function getCharactersFromBe() {
  return fetch(`${apiRaw}/character`).then(response => response.json());
}

export const getCharaterFromBe = (id: number) => {
  return fetch(`${apiRaw}/character/${id}`).then(response => response.json());
};
