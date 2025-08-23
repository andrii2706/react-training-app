import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardComponent } from '../../shared/components/cards/card.component';
import { LocationInterface } from '../../shared/models/location.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { getLocations } from '../../api-services/location.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AppDispatch } from '../../store/store';
import { setLocationsStore, setPaginationInfoStore } from '../../store/locations-data/location-data';

export const LocationComponent = () => {
  const [locations, setLocations] = useState([] as LocationInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const locationsData = () => {
    setLoader(true);
    getLocations(page)
      .then(data => {
        setLocations(data.results);
        setPaginationInfo(data.info);
        dispatch(setLocationsStore(data.results));
        dispatch(setPaginationInfoStore(data.info));
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
    locationsData();
  };

  useEffect(() => {
    locationsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <LoaderComponent showLoader={showLoader} />
      <div className="grid justify-items-center small-desktop:grid-cols-2 2xl:grid-cols-3 gap-3 w-full">
        {locations.map((locations, index) => (
          <CardComponent key={index} dataOfItem={locations} dataType={'locations'} />
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
