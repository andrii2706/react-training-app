import { useEffect, useState } from 'react';
import { getGamesFromBe } from '../../../api-services/game-service';

export function GameCard() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const controller = new AbortController();

    getGamesFromBe({ signal: controller.signal })
      .then(res => res.json())
      .then(res => {
        setGames(res);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  console.log(games);

  return <div className="">hello Game Card</div>;
}
