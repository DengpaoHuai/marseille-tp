import useFetch from "../hooks/useFetch";

type Planet = {
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
  next: string | null;
  previous: string | null;
  results: Planet[];
};

const PlanetTsList = () => {
  const { data, loading, error } = useFetch<PlanetResponse>(
    "https://swapi.dev/api/planets/"
  );

  return (
    <>
      {data?.results.map((planet) => (
        <div key={planet.name}>
          <h2>{planet.name}</h2>
          <p>Population: {planet.population}</p>
          <p>Climate: {planet.climate}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
      ))}
    </>
  );
};

export default PlanetTsList;
