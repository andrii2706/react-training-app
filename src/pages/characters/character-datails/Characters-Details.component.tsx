import { useParams } from 'react-router-dom';
import { CharactesInterface } from '../../../shared/models/character.interface';
import { EpisodesInterface } from '../../../shared/models/episodes.interface';
import { LocationInterface } from '../../../shared/models/location.interface';
import { useEffect, useState } from 'react';
import { getCharaterFromBe } from '../../../api-services/characters-api.service';
import { getEpisode } from '../../../api-services/episodes-api.service';
import { getLocation } from '../../../api-services/location.service';

export const CharactersDetailsComponent = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharactesInterface | null>(null);
  const [episode, setEpisode] = useState<EpisodesInterface | null>(null);
  const [location, setLocation] = useState<LocationInterface | null>(null);
  const [showLoader, setLoader] = useState(false);

  const charactersData = () => {
    setLoader(true);
    if (id) {
      getCharaterFromBe(+id)
        .then(data => {
          setCharacter(data.results);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const episodesData = () => {
    setLoader(true);
    if (id) {
      getEpisode(+id)
        .then(data => {
          setEpisode(data.results);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const locationsgData = () => {
    setLoader(true);
    if (id) {
      getLocation(+id)
        .then(data => {
          setLocation(data.results);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    charactersData();
    episodesData();
    locationsgData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>Charaters Details </>;
};
