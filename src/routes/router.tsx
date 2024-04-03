import { createBrowserRouter } from "react-router-dom";
import PlanetTsList from "../pages/PlanetTSList";
import Example1 from "../pages/Example1";
import Example2 from "../pages/Example2";

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
]);

export default router;