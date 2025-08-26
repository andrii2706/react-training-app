import React, { useEffect, useState } from 'react';
import { CharactesInterface } from '../../shared/models/character.interface';
import { getCharactersFromBe } from '../../api-services/characters-api.service';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { CardComponent } from '../../shared/components/cards/card.component';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  setCharactersStore,
  setPaginationInfoStore,
} from '../../store/characters-data/characters-data';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

export const CharactesComponent = () => {
  const [characters, setCharacters] = useState<CharactesInterface[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const charactersData = () => {
    setLoader(true);
    getCharactersFromBe(page)
      .then(data => {
        setCharacters(data.results);
        setPaginationInfo(data.info);
        dispatch(setCharactersStore(data.results));
        dispatch(setPaginationInfoStore(data.info));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    charactersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section>
      <LoaderComponent showLoader={showLoader} />
      <div className="my-10 flex justify-center text-center">
        <h1 className="text-3xl">Characters</h1>
      </div>
      <div className="grid justify-items-center small-desktop:grid-cols-2 2xl:grid-cols-3 gap-3 w-full">
        {characters.map((character, index) => (
          <CardComponent key={index} dataOfItem={character} dataType={'characters'} />
        ))}
      </div>
      <div className="my-10 flex justify-center items-center">
        <PaginationComponent
          pageWindowSize={10}
          totalPages={paginationInfo.count}
          onPageChange={newPage => {
            setPage(newPage);
          }}
        />
      </div>
    </section>
  );
};
