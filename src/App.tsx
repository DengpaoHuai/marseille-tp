import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PlanetList from "./pages/PlanetList.jsx";
import PlanetTsList from "./pages/PlanetTSList.js";

const client = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
function App() {
  return (
    <QueryClientProvider client={client}>
      <PlanetTsList></PlanetTsList>
    </QueryClientProvider>
  );
}

export default App;
