import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

const PlanetList = () => {
  const { data, loading, error } = useFetch("https://swapi.dev/api/planets/");
  const { data: starships } = useFetch("https://swapi.dev/api/starships/");

  console.log("rerender");
  /*
  const handleNext = () => {
    getPlanets(planetsResponse.next);
  };

  const handlePrevious = () => {
    getPlanets(planetsResponse.previous);
  };*/
  if (error) {
    return <div>{error}</div>;
  }
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
      {starships?.results.map((starship) => (
        <div key={starship.name}>
          <h2>{starship.name}</h2>
          <p>Model: {starship.model}</p>
          <p>Manufacturer: {starship.manufacturer}</p>
          <p>Cost in credits: {starship.cost_in_credits}</p>
        </div>
      ))}
    </>
  );
};

export default PlanetList;
