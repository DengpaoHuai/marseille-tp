import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";

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
  const [planetResponse, setPlanetResponse] = useState<PlanetResponse>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanets = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanetResponse(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError("An error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/");
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {planetResponse?.results.map((planet) => (
        <div key={planet.name}>
          <h2>{planet.name}</h2>
          <p>Population: {planet.population}</p>
          <p>Climate: {planet.climate}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
      ))}
      <button
        disabled={!planetResponse?.previous}
        onClick={() =>
          planetResponse?.previous && fetchPlanets(planetResponse.previous)
        }
      >
        Previous
      </button>

      <button
        disabled={!planetResponse?.next}
        onClick={() =>
          planetResponse?.next && fetchPlanets(planetResponse.next)
        }
      >
        Next
      </button>
    </>
  );
};

export default PlanetTsList;
