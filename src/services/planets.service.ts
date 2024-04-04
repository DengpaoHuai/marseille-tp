import { RedFetch } from "../utils/redFetch";

export type Planet = {
  name: string;
  url: string;
  population: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
};

type PlanetResponse = {
  count: number;
  next: string;
  previous: string;
  results: Planet[];
};

const instance = new RedFetch("https://swapi.dev/api/");

type GetPlanetsFn = (page?: string) => Promise<PlanetResponse>;
export const getPlanets: GetPlanetsFn = async (page = "1") => {
  return await instance.fetch("planets?page=" + page, { method: "GET" });
};
