import React, { Fragment, useEffect, useState } from "react";
import "./App.css";

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

function App() {
  const [planets, setPlanets] = useState<Planet[]>([]);

  /*const getData = async () => {
    const response = await fetch("https://swapi.dev/api/planets");
    const data = await response.json();
    console.log(data);
    setPlanets(data);
  };*/
  //
  useEffect(() => {
    fetch("https://swapi.dev/api/planets")
      .then((response) => response.json())
      .then((data: PlanetResponse) => setPlanets(data.results))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = () => {};

  return (
    <>
      {planets.map((planet) => {
        return (
          <Fragment key={planet.url}>
            <p>{planet.name}</p>
          </Fragment>
        );
      })}
      <button onClick={handleClick}>coucou</button>
    </>
  );
}

export default App;
