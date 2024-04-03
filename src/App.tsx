import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import TravelContextProvider from "./contexts/TravelContextProvider";

function App() {
  return (
    <TravelContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </TravelContextProvider>
  );
}

export default App;
