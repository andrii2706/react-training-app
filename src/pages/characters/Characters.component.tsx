import React, { useEffect, useState } from 'react';
import { CharactesInterface } from '../../shared/models/character.interface';
import { getCharactersFromBe } from '../../api-services/characters-api.service';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { CardComponent } from '../../shared/components/cards/card.component';
import ReactPaginate from 'react-paginate';

export const CharactesComponent = () => {
  const [characters, setCharacters] = useState([] as CharactesInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);

  const charactersData = () => {
    setLoader(true);
    getCharactersFromBe(page)
      .then(data => {
        setCharacters(data.results);
        setPaginationInfo(data.info);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const goToPage = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
    charactersData();
  };

  useEffect(() => {
    charactersData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}
      <h1>Characters</h1>
      <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
        {characters.map((character, index) => (
          <CardComponent key={index} dataOfItem={character} dataType={'characters'} />
        ))}
      </div>
      <div className="my-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          pageCount={paginationInfo.pages}
          onPageChange={goToPage}
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
    </section>
  );
};
