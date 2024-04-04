import { Travel } from "../contexts/TravelContextProvider";
import { RedFetch } from "../utils/redFetch";

const instance = new RedFetch(
  "https://crudcrud.com/api/ea11dccf31d14e46b91ea9185628e5fa"
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
    headers: {
      "content-type": "application/json",
    },
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
