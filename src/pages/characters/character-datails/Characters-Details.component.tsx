import { useNavigate, useParams } from 'react-router-dom';
import { CharactesInterface } from '../../../shared/models/character.interface';
import { useEffect, useState } from 'react';
import { getCharaterFromBe } from '../../../api-services/characters-api.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { getEpisode } from '../../../api-services/episodes-api.service';
import { EpisodesInterface } from '../../../shared/models/episodes.interface';
import { getLocationForCharacter } from '../../../api-services/location.service';
import { LocationInterface } from '../../../shared/models/location.interface';

export const CharactersDetailsComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<CharactesInterface | null>(null);
  const [episodes, setEpisodes] = useState<EpisodesInterface[] | null>(null);
  const [location, setLocation] = useState<LocationInterface | null>(null);
  const [showLoader, setLoader] = useState(false);

  const charactersData = () => {
    setLoader(true);
    if (id) {
      getCharaterFromBe(+id)
        .then(async data => {
          setCharacter(data);
          const episodeUrls = data.episode as string[];
          const locationUrl = data.origin.url as string;

          const episodesData = await Promise.all(episodeUrls.map(url => getEpisode(url)));
          fetchPlanetData(locationUrl).then(location => {
            setLocation(location);
          });
          setEpisodes(episodesData);
        })
        .catch(error => {
          console.log(error);
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
      console.error(error);
      return null;
    }
  };

  const redirectToEpisode = (id: number) => {
      navigate(`/episodes/${id}`)
  }

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
            <h2 className="text-3xl py-4 ">{character?.name}</h2>
          </div>
          <div className="flex justify-end text-end flex-col">
            <kbd className="kbd kbd-xl">Gender - {character?.gender}</kbd>
            <kbd className="kbd kbd-xl my-4">Status - {character?.status}</kbd>
            <kbd className="kbd kbd-xl">Location Name - {character?.location?.name}</kbd>
            <kbd className="kbd kbd-xl my-4">Species - {character?.species}</kbd>
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
                    <button className="btn btn-soft" onClick={() => redirectToEpisode(episode.id)}>See Episode</button>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
