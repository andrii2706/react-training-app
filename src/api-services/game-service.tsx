const gamesApiRaw = 'https://api.rawg.io/api'
const gamesApiKey = '85d9905e7cd7443c8983e54b4733abf5'


export function getGamesFromBe(options: any) {
    return fetch(`${gamesApiRaw}/games?key=${gamesApiKey}`, options)
}