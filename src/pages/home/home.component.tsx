import { useEffect, useState } from 'react';
import { getCharactersFromBe } from '../../api-services/characters-api.service';
import { getEpisodes } from '../../api-services/episodes-api.service';
import { CardComponent } from '../../shared/components/cards/card.component';
import ReactPaginate from 'react-paginate';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { CharactesInterface } from '../../shared/models/character.interface';
import { EpisodesInterface } from '../../shared/models/episodes.interface';
import { LocationInterface } from '../../shared/models/location.interface';
import { getLocations } from '../../api-services/location.service';

export const HomeComponent = () => {
  const [showCharaters, setShowCharacters] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [characters, setCharacters] = useState([] as CharactesInterface[]);
  const [episodes, setEpisodes] = useState([] as EpisodesInterface[]);
  const [locations, setLocations] = useState([] as LocationInterface[]);
  const [paginationCharacterInfo, setPaginationCharacterInfo] = useState(
    {} as PaginationInfoInterface
  );
  const [paginationEpisodesInfo, setPaginationEpisodesInfo] = useState(
    {} as PaginationInfoInterface
  );
  const [paginationLocationsInfo, setPaginationLocationsInfo] = useState(
    {} as PaginationInfoInterface
  );
  const [pageCharacters, setPageCharacters] = useState(1);
  const [pageEpisodes, setPageEpisodes] = useState(1);
  const [pageLocations, setPageLocations] = useState(1);
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

  const goToPageCharacters = (selectedItem: { selected: number }) => {
    setPageCharacters(selectedItem.selected + 1);
  };
  const goToPageEpisodes = (selectedItem: { selected: number }) => {
    setPageEpisodes(selectedItem.selected + 1);
  };
  const goToPageLocations = (selectedItem: { selected: number }) => {
    setPageLocations(selectedItem.selected + 1);
  };

  useEffect(() => {
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
          {showLoader && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
              <span className="loading loading-dots loading-xl text-black"></span>
            </div>
          )}

          {showCharaters && (
            <div>
              <div className="grid justify-items-center small-desktop:grid-cols-2 2xl:grid-cols-3 gap-3 w-full">
                {characters.map((character, index) => (
                  <CardComponent key={index} dataOfItem={character} dataType={'characters'} />
                ))}
              </div>
              {characters.length > 10 && (
                <div className="my-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={paginationCharacterInfo.pages}
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
              {characters.length > 10 && (
                <div className="my-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={paginationEpisodesInfo.pages}
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
              {characters.length > 10 && (
                <div className="my-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={paginationLocationsInfo.pages}
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
