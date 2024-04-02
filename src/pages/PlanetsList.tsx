import { useEffect, useState } from "react";

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
  next: string;
  previous: string;
  results: Planet[];
};

const PlanetsList = () => {
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
    <div>
      {planetResponse.results.map((planet) => {
        return <p key={planet.url}>{planet.name}</p>;
      })}
      <button
        onClick={() => fetchPlanets(planetResponse.previous)}
        disabled={!planetResponse.previous}
      >
        Page précédente
      </button>
      {Array.from({ length: Math.ceil(planetResponse.count / 10) }).map(
        (_, index) => {
          return (
            <button
              key={index}
              onClick={() =>
                fetchPlanets(`https://swapi.dev/api/planets/?page=${index + 1}`)
              }
            >
              {index + 1}
            </button>
          );
        }
      )}
      <button
        onClick={() => fetchPlanets(planetResponse.next)}
        disabled={!planetResponse.next}
      >
        Page suivante
      </button>
    </div>
  );
};

export default PlanetsList;
