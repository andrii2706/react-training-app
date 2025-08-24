import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEpisodes } from '../../api-services/episodes-api.service';
import { CharactesInterface } from '../../shared/models/character.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { CardComponent } from '../../shared/components/cards/card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AppDispatch } from '../../store/store';
import { setEpisodesStore, setPaginationInfoStore } from '../../store/episodes/episodes-data';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

export const EpisodesComponent = () => {
  const [episodes, setEpisodes] = useState([] as CharactesInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const episodesData = () => {
    setLoader(true);
    getEpisodes(page)
      .then(data => {
        setEpisodes(data.results);
        setPaginationInfo(data.info);
        dispatch(setEpisodesStore(data.results));
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
    episodesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <LoaderComponent showLoader={showLoader} />
      <div className="grid justify-items-center small-desktop:grid-cols-2 2xl:grid-cols-3 gap-3 w-full">
        {episodes.map((episodes, index) => (
          <CardComponent key={index} dataOfItem={episodes} dataType={'episodes'} />
        ))}
      </div>
      <div className="my-10">
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
