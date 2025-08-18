import { useEffect, useState } from 'react';
import { getEpisodes } from '../../api-services/episodes-api.service';
import { CharactesInterface } from '../../shared/models/character.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import ReactPaginate from 'react-paginate';
import { CardComponent } from '../../shared/components/cards/card.component';

export const EpisodesComponent = () => {
  const [episodes, setEpisodes] = useState([] as CharactesInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);

  const episodesData = () => {
    setLoader(true);
    getEpisodes(page)
      .then(data => {
        setEpisodes(data.results);
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
    episodesData();
  };

  useEffect(() => {
    episodesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}
      <div className="grid justify-items-center small-desktop:grid-cols-2 2xl:grid-cols-3 gap-3 w-full">
        {episodes.map((episodes, index) => (
          <CardComponent key={index} dataOfItem={episodes} dataType={'episodes'} />
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
