import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import TravelContextProvider from "./contexts/TravelContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <TravelContextProvider>
      <p className="logo">coucou c moi</p>
      <RouterProvider router={router}></RouterProvider>
    </TravelContextProvider>
  );
}

export default App;
