const gamesApiRaw = 'https://rickandmortyapi.com/api';

export function getGamesFromBe(options: any) {
  return fetch(`${gamesApiRaw}/games`, options);
}
