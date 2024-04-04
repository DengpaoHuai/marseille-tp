import { useQuery } from "@tanstack/react-query";
import { getPlanets } from "../services/planets.service";
import { useState } from "react";

const PlanetsList = () => {
  const [page, setPage] = useState(1);
  const { data: planetResponse, isLoading } = useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(`${page}`),
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {planetResponse?.results.map((planet) => {
        return <p key={planet.url}>{planet.name}</p>;
      })}
      <button
        onClick={() => setPage(page - 1)}
        disabled={!planetResponse?.previous}
      >
        {" "}
        Page précédente
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!planetResponse?.next}
      >
        {" "}
        Page suivante
      </button>
    </div>
  );
};

export default PlanetsList;
