const apiRaw = 'https://rickandmortyapi.com/api/characters';


export function getAllCharacters(page: number){
  return fetch(`${apiRaw}/?page=${page}`)
}
export function getCharacter(id: number){
  return fetch(`${apiRaw}/${id}`)
}
export function searchCharacters(options: any){
  return fetch(`${apiRaw}`, options)
}