import ReactPaginate from 'react-paginate';
import { CardComponent } from '../../shared/components/cards/card.component';
import { useEffect, useState } from 'react';
import { LocationInterface } from '../../shared/models/location.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { getLocations } from '../../api-services/location.service';

export const LocationComponent = () => {
  const [locations, setLocations] = useState([] as LocationInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);

  const locationsData = () => {
    setLoader(true);
    getLocations(page)
      .then(data => {
        setLocations(data.results);
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
    locationsData();
  };

  useEffect(() => {
    locationsData();
  });

  return (
    <section>
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}
      <div className="grid justify-items-center grid-cols-3 gap-3 w-full">
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
