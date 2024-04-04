import { createBrowserRouter } from "react-router-dom";
import PlanetTsList from "../pages/PlanetTSList";
import Example1 from "../pages/Example1";
import Example2 from "../pages/Example2";
import CreateTravel from "../pages/CreateTravel";
import TravelsList from "../pages/TravelsList";
import UpdateTravel from "../pages/UpdateTravel";
import { Travel } from "../contexts/TravelContextProvider";
import CustomLayout from "../layouts/CustomLayout";
const router = createBrowserRouter([
  {
    path: "/planets",
    element: <PlanetTsList></PlanetTsList>,
  },
  {
    path: "/example1",
    element: <Example1></Example1>,
  },
  {
    path: "/example2/:id/:second?",
    element: <Example2></Example2>,
  },
  {
    element: <div>404</div>,
    path: "*",
  },
  {
    element: <CustomLayout></CustomLayout>,
    children: [
      {
        element: <CreateTravel></CreateTravel>,
        path: "/create_travel",
      },
      {
        element: <TravelsList></TravelsList>,
        path: "/list_travels",
      },
      {
        element: <UpdateTravel></UpdateTravel>,
        path: "/update_travel/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            "https://crudcrud.com/api/fc63a333024340ec891fb35c31e5c652/travels/" +
              params.id
          );
          const data: Travel = await response.json();
          return data;
        },
      },
    ],
  },
]);

export default router;
