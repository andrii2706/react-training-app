import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardComponent } from '../../shared/components/cards/card.component';
import { LocationInterface } from '../../shared/models/location.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { getLocations } from '../../api-services/location.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AppDispatch } from '../../store/store';
import {
  setLocationsStore,
  setPaginationInfoStore,
} from '../../store/locations-data/location-data';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SnackBarComponent } from '../../shared/components/snackbar/snackBar.component';

export const LocationComponent = () => {
  const [locations, setLocations] = useState([] as LocationInterface[]);
  const [paginationInfo, setPaginationInfo] = useState({} as PaginationInfoInterface);
  const [page, setPage] = useState(1);
  const [showLoader, setLoader] = useState(false);
  const [snackBarError, showSnackBarError] = useState(false);
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
        if (error) {
          showSnackBarError(true);
        }
      })
      .finally(() => {
        setLoader(false);
      });
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
        <PaginationComponent
          pageWindowSize={10}
          totalPages={paginationInfo.count}
          onPageChange={newPage => {
            setPage(newPage);
          }}
        />
      </div>
      {snackBarError && (
        <SnackBarComponent
          snackBarStatus="error"
          title="Opps!! we have an error"
          description="Problem with locations api"
        />
      )}
    </section>
  );
};
