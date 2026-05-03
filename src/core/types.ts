export type MovieRespsonse = {
  id: number;
  title: string;
  name?: string; 
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  first_air_date?: string;
  results: Array<{
    name: string;
    id: number;
    original_title: string;
    original_name?: string;  
    poster_path: string;
  }>;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  total_pages: number;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type SeasonsResponse = {
  poster_path(poster_path: any): string | undefined;
  seasons: Array<{
    id: number;
    name: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
    season_number: number;
  }>;
};

export type EpisodeResponse = {
  name: string;
  overview: string;
  air_date: string;
  poster_path: string;
  episodes: Array<{
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    still_path: string;
  }>;
};

export type SearchResponse = {
  results: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  total_pages: number;
  total_results: number;
};

export type Media = 'movie' | 'tv';

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText: string;
  secondaryText?: string;
  media?: Media;
};

export type PersonResponse = {
  id: number;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  name: string;
};
