import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { getCharactersDataFromFireBase } from '../../api-services/characters-api.service';
import { getEpisodesDataFromFireBase } from '../../api-services/episodes-api.service';
import { CardComponent } from '../../shared/components/cards/card.component';
import { CharactesInterface } from '../../shared/models/character.interface';
import { EpisodesInterface } from '../../shared/models/episodes.interface';
import { LocationInterface } from '../../shared/models/location.interface';
import { getLocationsDataFromFireBase } from '../../api-services/location.service';
import { useNavigate } from 'react-router-dom';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

export const HomeComponent = () => {
  const navigate = useNavigate();
  const [showCharaters, setShowCharacters] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [characters, setCharacters] = useState([] as CharactesInterface[]);
  const [episodes, setEpisodes] = useState([] as EpisodesInterface[]);
  const [locations, setLocations] = useState([] as LocationInterface[]);
  const [showLoader, setLoader] = useState(false);

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

  const getCharactersDataFromFirebase = () => {
    setLoader(true);
    getCharactersDataFromFireBase()
      .then(charactersFromFB => {
        charactersFromFB.forEach(charac => {
          const char = charac as { id: string; characters: CharactesInterface[] };
          setCharacters(char.characters);
        });
      })
      .catch(error => console.error(error))
      .finally(() => setLoader(false));
  };

  const getEpisodesDataFromFirebase = () => {
    setLoader(true);
    getEpisodesDataFromFireBase()
      .then(charactersFromFB => {
        charactersFromFB.forEach(charac => {
          const char = charac as { id: string; episodes: EpisodesInterface[] };
          setEpisodes(char.episodes);
        });
      })
      .catch(error => console.error(error))
      .finally(() => setLoader(false));
  };

  const getLocationsDataFromFirebase = () => {
    setLoader(true);
    getLocationsDataFromFireBase()
      .then(charactersFromFB => {
        charactersFromFB.forEach(charac => {
          const char = charac as { id: string; locations: LocationInterface[] };
          setLocations(char.locations);
        });
      })
      .catch(error => console.error(error))
      .finally(() => setLoader(false));
  };

  const redirectToCharacters = () => {
    navigate('/characters');
  };

  const redirectToLocations = () => {
    navigate('/locations');
  };

  const redirectToEpisodes = () => {
    navigate('/episodes');
  };

  const goToPageCharacters = (selectedItem: { selected: number }) => {};

  const goToPageEpisodes = (selectedItem: { selected: number }) => {};

  const goToPageLocations = (selectedItem: { selected: number }) => {};

  useEffect(() => {
    getCharactersDataFromFirebase();
    getEpisodesDataFromFirebase();
    getLocationsDataFromFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section>
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">Hi, It's Our app about Rock and Morty</h1>
        </div>
        <div className="flex justify-center items-center mt-3 mb-5">
          <button className="btn btn-soft" onClick={() => changeCardsForPages('chracters')}>
            Selected Characters
          </button>
          <button className="btn btn-soft mx-2" onClick={() => changeCardsForPages('episodes')}>
            Selected Episodes
          </button>
          <button className="btn btn-soft" onClick={() => changeCardsForPages('locations')}>
            Selected Locations
          </button>
        </div>
        <div>
          <LoaderComponent showLoader={showLoader} />
          {showCharaters && (
            <div>
              <div className="grid justify-items-center small-desktop:grid-cols-2 2xl:grid-cols-3 gap-3 w-full">
                {characters.map((character, index) => (
                  <CardComponent key={index} dataOfItem={character} dataType={'characters'} />
                ))}
              </div>
              {characters.length === 0 && (
                <div className="flex justify-center items-center flex-col">
                  <h1 className="text-3xl">Oops List of Characters is empty</h1>
                  <p className="my-4">Please choose Your favourite Character to it here. </p>
                  <button className="btn btn-soft" onClick={redirectToCharacters}>
                    Choose Character
                  </button>
                </div>
              )}
              {characters.length > 10 && (
                <div className="my-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={0}
                    onPageChange={goToPageCharacters}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center space-x-2 pt-4"
                    pageClassName="btn btn-sm"
                    activeClassName="btn-primary"
                    previousClassName="btn btn-sm"
                    nextClassName="btn btn-sm"
                    breakClassName="btn btn-ghost btn-sm"
                  />
                </div>
              )}
            </div>
          )}
          {showEpisodes && (
            <div>
              <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
                {episodes.map((episodes, index) => (
                  <CardComponent key={index} dataOfItem={episodes} dataType={'episodes'} />
                ))}
              </div>
              {episodes.length === 0 && (
                <div className="flex justify-center items-center flex-col">
                  <h1 className="text-3xl">Oops List of Episodes is empty</h1>
                  <p className="my-4">Please choose Your favourite Episode to it here. </p>
                  <button className="btn btn-soft" onClick={redirectToEpisodes}>
                    Choose Episodes
                  </button>
                </div>
              )}
              {episodes.length > 10 && (
                <div className="my-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={0}
                    onPageChange={goToPageEpisodes}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center space-x-2 pt-4"
                    pageClassName="btn btn-sm"
                    activeClassName="btn-primary"
                    previousClassName="btn btn-sm"
                    nextClassName="btn btn-sm"
                    breakClassName="btn btn-ghost btn-sm"
                  />
                </div>
              )}
            </div>
          )}
          {showLocations && (
            <div>
              <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
                {locations.map((locations, index) => (
                  <CardComponent key={index} dataOfItem={locations} dataType={'locations'} />
                ))}
              </div>
              {locations.length === 0 && (
                <div className="flex justify-center items-center flex-col">
                  <h1 className="text-3xl">Oops List of Locations is empty</h1>
                  <p className="my-4">Please choose Your favourite Location to it here. </p>
                  <button className="btn btn-soft" onClick={redirectToLocations}>
                    Choose Locations
                  </button>
                </div>
              )}
              {locations.length > 10 && (
                <div className="my-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={0}
                    onPageChange={goToPageLocations}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center space-x-2 pt-4"
                    pageClassName="btn btn-sm"
                    activeClassName="btn-primary"
                    previousClassName="btn btn-sm"
                    nextClassName="btn btn-sm"
                    breakClassName="btn btn-ghost btn-sm"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
