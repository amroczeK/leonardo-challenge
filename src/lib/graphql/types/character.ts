// Reference: https://rickandmortyapi.com/documentation/#character-schema
export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// Reference: https://rickandmortyapi.com/documentation/#location-schema
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface CharactersResponse {
  characters: {
    info: PaginationInfo;
    results: Character[];
  };
}

export interface CharacterResponse {
  character: Character;
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}
