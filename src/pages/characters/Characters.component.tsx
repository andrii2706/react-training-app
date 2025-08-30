import React, { useEffect, useState } from 'react';
import { CharactesInterface } from '../../shared/models/character.interface';
import { getCharactersFromBe } from '../../api-services/characters-api.service';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { CardComponent } from '../../shared/components/cards/card.component';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  setCharactersStore,
  setPaginationInfoStore,
} from '../../store/characters-data/characters-data';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../shared/components/filter/search.component';
import { FilterInterface } from '../../shared/models/filter.interface';
import { SnackBarComponent } from '../../shared/components/snackbar/snackBar.component';

export const CharactesComponent = () => {
  const filterData = useSelector((state: RootState) => state.characters.filterCharacters);
  const [characters, setCharacters] = useState<CharactesInterface[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);
  const [snackBarError, showSnackBarError] = useState(false);
  const [snackBarWarning, showSnackBarWarning] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const charactersData = (characterFilterData: FilterInterface) => {
    setLoader(true);
    getCharactersFromBe(page, characterFilterData)
      .then(data => {
        setCharacters(data.results);
        setPaginationInfo(data.info);
        dispatch(setCharactersStore(data.results));
        dispatch(setPaginationInfoStore(data.info));
      })
      .catch(error => {
        if (error) {
          showSnackBarError(true);
          showSnackBarWarning(true);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (filterData) {
      return charactersData(filterData);
    } else {
      return charactersData({ name: '', gender: '', species: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, page]);

  return (
    <section>
      <LoaderComponent showLoader={showLoader} />
      {characters.length && <SearchComponent />}
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
      <div>
        {snackBarError && (
          <SnackBarComponent
            snackBarStatus="error"
            title="Opps!! we have an error"
            description="Problem with characters api"
          />
        )}
        {snackBarWarning && (
          <SnackBarComponent
            snackBarStatus="warning"
            title="Warning Issue"
            description="Opps!! Update page or contact with our support"
          />
        )}
      </div>
    </section>
  );
};
