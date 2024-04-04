import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import TravelContextProvider from "./contexts/TravelContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./store/store";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
