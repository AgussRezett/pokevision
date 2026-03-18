export interface Episode {
  code: string;
  season: number;
  episode: number;
  absoluteEpisode: number;
  name: string;
  url: string;
  isCanon: boolean;
  isCensored: boolean;
}

export interface CapturedPokemon {
  name: string;
  img: string;
  debutEpisode: number;
}
