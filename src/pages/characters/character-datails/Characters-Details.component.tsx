import { useParams } from 'react-router-dom';
import { CharactesInterface } from '../../../shared/models/character.interface';
import { useEffect, useState } from 'react';
import {
  getCharaterFromBe,
  getResidentsFromBe,
} from '../../../api-services/characters-api.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { getEpisode } from '../../../api-services/episodes-api.service';
import { EpisodesInterface } from '../../../shared/models/episodes.interface';
import { getLocationForCharacter } from '../../../api-services/location.service';
import { LocationInterface } from '../../../shared/models/location.interface';
import { addToFavouriteCharacters } from '../../../api-services/favouriteItems.service';
import { SnackBarComponent } from '../../../shared/components/snackbar/snackBar.component';

export const CharactersDetailsComponent = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharactesInterface | null>(null);
  const [residents, setResidents] = useState<CharactesInterface[] | null>(null);
  const [episodes, setEpisodes] = useState<EpisodesInterface[] | null>(null);
  const [location, setLocation] = useState<LocationInterface | null>(null);
  const [showLoader, setLoader] = useState(false);
  const [snackBarError, showSnackBarError] = useState(false);
  const [snackBarWarning, showSnackBarWarning] = useState(false);
  const [snackBarSuccess, showSnackBarSuccess] = useState(false);

  const charactersData = () => {
    setLoader(true);
    if (id) {
      getCharaterFromBe(+id)
        .then(async data => {
          setCharacter(data);
          const episodeUrls = data.episode as string[];
          const locationUrl = data.origin.url as string;

          const episodesData = await Promise.all(episodeUrls.map(url => getEpisode(url)));
          fetchPlanetData(locationUrl).then(async location => {
            const residentsUrl = location.residents as string[];
            const residentsData = await Promise.all(
              residentsUrl.map(url => getResidentsFromBe(url))
            );

            setResidents(residentsData);
            setLocation(location);
          });
          setEpisodes(episodesData);
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
    }
  };

  const fetchPlanetData = async (url: string) => {
    if (!url) return null;
    try {
      const res = await getLocationForCharacter(url);
      return await res;
    } catch (error) {
      if (error) {
        showSnackBarError(true);
        showSnackBarWarning(true);
      }
      return null;
    }
  };

  const addToFavourite = (characterInfo: CharactesInterface | null) => {
    setLoader(true);
    if (characterInfo) {
      addToFavouriteCharacters(characterInfo)
        .then(res => {
          showSnackBarSuccess(true);
        })
        .catch(error => {
          if (error) {
            showSnackBarError(true);
            showSnackBarWarning(false);
            showSnackBarSuccess(false);
          }
        })
        .finally(() => setLoader(false));
    }
  };

  useEffect(() => {
    charactersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LoaderComponent showLoader={showLoader} />
      <section className="bg-slate-400 rounded-md p-10">
        <div className="flex items-center justify-between">
          <div>
            <img className="rounded-md" src={character?.image} alt={character?.name} />
          </div>
          <div className="flex justify-end items-end flex-col">
            <p className="badge badge-ghost text-xl">{character?.name}</p>
            <p className="badge badge-ghost mt-4">Gender - {character?.gender}</p>
            <p className="badge badge-ghost my-4">Status - {character?.status}</p>
            <p className="badge badge-ghost">Location Name - {character?.location?.name}</p>
            <p className="badge badge-ghost my-4">Species - {character?.species}</p>
            <button
              className="btn btn-soft"
              onClick={() => {
                addToFavourite(character);
              }}
            >
              Add to Favourite
            </button>
          </div>
        </div>
        <div>
          <div className="tabs tabs-border">
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Tab 1" />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              {episodes?.length ? (
                episodes?.map(episode => (
                  <div className="py-5">
                    <h2 className="text-3xl">{episode.name}</h2>
                    <p className="pt-5">Air Date: {episode.air_date}</p>
                    <p className="py-5">Episode: {episode.episode}</p>
                  </div>
                ))
              ) : (
                <div>This character didn't take a part in Episodes</div>
              )}
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="Tab 2"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 p-10">
              <h1>Location Name - {character?.origin.name}</h1>
              <p>Location dimension - {location?.dimension}</p>
              <p>Type Of location - {location?.type}</p>
              <div className="flex justify-center items-center">
                <h2 className="text-3xl">Residents</h2>
              </div>
              {residents?.length ? (
                residents?.map(resident => (
                  <div className="flex items-center justify-between py-10">
                    <div>
                      <img className="rounded-md" src={resident?.image} alt={resident?.name} />
                      <h2 className="text-3xl py-4 ">{resident?.name}</h2>
                    </div>
                    <div className="flex justify-end items-end flex-col">
                      <p className="badge badge-ghost">Gender - {resident?.gender}</p>
                      <p className="badge badge-ghost my-4">Status - {resident?.status}</p>
                      <p className="badge badge-ghost">
                        Location Name - {resident?.location?.name}
                      </p>
                      <p className="badge badge-ghost my-4">Species - {resident?.species}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div>This location doesn't have residents</div>
              )}
            </div>
          </div>
        </div>
        <div>
          {snackBarSuccess && (
            <SnackBarComponent
              snackBarStatus="success"
              title="Success"
              description="You have been loggined Successfully"
            />
          )}
          {snackBarError && (
            <SnackBarComponent
              snackBarStatus="error"
              title="Opps!! we have an error"
              description="We have an error with login, please wait some time"
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
    </>
  );
};
