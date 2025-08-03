import { useEffect, useState } from 'react';
import { getCharactersFromBe } from '../../api-services/characters-api.service';
import { getEpisodes } from '../../api-services/episodes-api.service';
import { CardComponent } from '../../shared/components/cards/card.component';
import ReactPaginate from 'react-paginate';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { CharactesInterface } from '../../shared/models/character.interface';
import { EpisodesInterface } from '../../shared/models/episodes.interface';
import { LocationInterface } from '../../shared/models/location.interface';

export const HomeComponent = () => {
  const [showCharaters, setShowCharacters] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [characters, setCharacters] = useState([] as CharactesInterface[]);
  const [episodes, setEpisodes] = useState([] as EpisodesInterface[]);
  const [locations, setLocations] = useState([] as LocationInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);

  const charactersData = () => {
    getCharactersFromBe()
      .then(data => {
        setCharacters(data.results);
        setPaginationInfo(data.info);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const episodesData = () => {
    getEpisodes()
      .then(data => {
        setEpisodes(data.results);
        setPaginationInfo(data.info);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeCardsForPages = (typeOfCards: string) => {
    switch (typeOfCards) {
      case 'episodes':
        setShowCharacters(false);
        setShowLocations(false);
        setShowEpisodes(true);
        break;
      case 'locations':
        setShowCharacters(false);
        setShowLocations(true);
        setShowEpisodes(false);
        break;
      case 'chracters':
        setShowCharacters(true);
        setShowLocations(false);
        setShowEpisodes(false);
        break;

      default:
        setShowCharacters(true);
        break;
    }
  };

  useEffect(() => {
    charactersData();
    episodesData();
  }, []);

  return (
    <>
      <section>
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">Hi, It's Our app about Rock and Morty</h1>
        </div>
        <div className="flex justify-center items-center mt-3 mb-5">
          <button className="btn btn-soft" onClick={() => changeCardsForPages('chracters')}>
            Characters
          </button>
          <button className="btn btn-soft mx-2" onClick={() => changeCardsForPages('episodes')}>
            Episodes
          </button>
          <button className="btn btn-soft" onClick={() => changeCardsForPages('locations')}>
            Locations
          </button>
        </div>
        <div>
          {showCharaters && (
            <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
              {characters.map(character => (
                <CardComponent dataOfItem={character} dataType={'characters'} />
              ))}
            </div>
          )}
          {showEpisodes && (
            <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
              {episodes.map(episodes => (
                <CardComponent dataOfItem={episodes} dataType={'episodes'} />
              ))}
            </div>
          )}
          {showLocations && (
            <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
              {locations.map(locations => (
                <CardComponent dataOfItem={locations} dataType={'locations'} />
              ))}
            </div>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            pageRangeDisplayed={5}
            pageCount={paginationInfo.pages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
    </>
  );
};
