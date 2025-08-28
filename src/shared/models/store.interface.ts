import { PaginationInfoInterface } from './array.interface';
import { CharactesInterface } from './character.interface';
import { EpisodesInterface } from './episodes.interface';
import { FilterInterface } from './filter.interface';
import { LocationInterface } from './location.interface';

export interface InitialCharactersStateInterface {
  characters: CharactesInterface[];
  paginationInfo: PaginationInfoInterface | null;
  filterCharacters: FilterInterface | null
}

export interface InitiaEpisodesStateInterface {
  episodes: EpisodesInterface[];
  paginationInfo: PaginationInfoInterface | null;
}

export interface InitialLocationsStateInterface {
  locations: LocationInterface[];
  paginationInfo: PaginationInfoInterface | null;
}
