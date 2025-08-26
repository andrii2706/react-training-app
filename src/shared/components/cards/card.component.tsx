import { useNavigate } from 'react-router-dom';
import { CharactesInterface } from '../../models/character.interface';
import { EpisodesInterface } from '../../models/episodes.interface';
import { LocationInterface } from '../../models/location.interface';
import { useState } from 'react';
import { LoaderComponent } from '../loader/loader.component';
import {
  addToFavouriteEpisodes,
  addToFavouriteLocations,
} from '../../../api-services/favouriteItems.service';

interface cardDataType {
  dataOfItem: CharactesInterface | EpisodesInterface | LocationInterface;
  dataType: string;
}

export const CardComponent = ({ dataOfItem, dataType }: cardDataType) => {
  const characterImage = (dataOfItem as CharactesInterface).image;
  const characterStatus = (dataOfItem as CharactesInterface).status;
  const characterSpecies = (dataOfItem as CharactesInterface).species;
  const characterGender = (dataOfItem as CharactesInterface).gender;
  const [showLoader, setLoader] = useState(false);
  const navigation = useNavigate();

  const redirectToCharacters = () => {
    navigation(`/characters/${dataOfItem.id}`);
  };

  const addLocationToFavourite = (characterInfo: LocationInterface | null) => {
    setLoader(true);
    if (characterInfo) {
      addToFavouriteLocations(characterInfo)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoader(false));
    }
  };

  const addEpisodeToFavourite = (characterInfo: EpisodesInterface | null) => {
    setLoader(true);
    if (characterInfo) {
      addToFavouriteEpisodes(characterInfo)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoader(false));
    }
  };

  return (
    <>
      <LoaderComponent showLoader={showLoader} />
      {dataType === 'characters' && (
        <div className="card bg-base-100 w-96 pt-4 shadow-sm bg-gray-500">
          <figure>
            <img src={characterImage} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{dataOfItem.name}</h2>
            <p>Status - {characterStatus}</p>
            <p>Species - {characterSpecies}</p>
            <p>Gender - {characterGender}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={redirectToCharacters}>
                Details
              </button>
            </div>
          </div>
        </div>
      )}
      {dataType === 'episodes' && (
        <div className="card bg-base-100 w-96 shadow-sm bg-gray-500">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{dataOfItem.name}</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => addEpisodeToFavourite(dataOfItem as EpisodesInterface)}
              >
                Add to favourite
              </button>
            </div>
          </div>
        </div>
      )}
      {dataType === 'locations' && (
        <div className="card bg-base-100 w-96 shadow-sm bg-gray-500">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{dataOfItem.name}</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => addLocationToFavourite(dataOfItem as LocationInterface)}
              >
                Add to favourite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
