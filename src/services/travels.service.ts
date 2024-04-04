import { Travel } from "../contexts/TravelContextProvider";
import { RedFetch } from "../utils/redFetch";

const instance = new RedFetch(
  "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652"
);

type GetTravelsFn = () => Promise<Travel[]>;
export const getTravels: GetTravelsFn = async () => {
  return await instance.fetch("/travels", { method: "GET" });
};

type PostTravelFn = (travel: Omit<Travel, "_id">) => Promise<Travel>;
export const postTravel: PostTravelFn = async (travel: Omit<Travel, "_id">) => {
  return await instance.fetch("/travels", {
    method: "POST",
    body: JSON.stringify(travel),
  });
};

export const deleteTravel = async (id: string) => {
  return await instance.fetch(`/travels/${id}`, { method: "DELETE" });
};

export const putTravel = async (id: string, travel: Omit<Travel, "_id">) => {
  return await instance.fetch(`/travels/${id}`, {
    method: "PUT",
    body: JSON.stringify(travel),
  });
};
