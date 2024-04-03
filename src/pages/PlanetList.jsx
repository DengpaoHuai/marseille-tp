import { useEffect } from "react";
import { useState } from "react";

const PlanetList = () => {
  const [planetsResponse, setPlanetsResponse] = useState({
    results: [],
    count: 0,
    next: null,
    previous: null,
  });

  const getPlanets = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPlanetsResponse(data);
  };

  useEffect(() => {
    getPlanets("https://swapi.dev/api/planets/");
  }, []);

  const handleNext = () => {
    getPlanets(planetsResponse.next);
  };

  const handlePrevious = () => {
    getPlanets(planetsResponse.previous);
  };

  return (
    <>
      {planetsResponse.results.map((planet) => (
        <div key={planet.name}>
          <h2>{planet.name}</h2>
          <p>Population: {planet.population}</p>
          <p>Climate: {planet.climate}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
      ))}
      <button disabled={!planetsResponse.previous} onClick={handlePrevious}>
        Previous
      </button>
      <button disabled={!planetsResponse.next} onClick={handleNext}>
        Next
      </button>
    </>
  );
};

export default PlanetList;
