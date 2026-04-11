import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import Recent from "./pages/Recent";
import TVDetails from "./pages/Details";
import CinemaPlayer from "./CinemaPlayer"; 
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 20 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/watchlist" component={Watchlist} />
      <Route path="/recent" component={Recent} />
      <Route path="/tv/:id" component={TVDetails} />
      <Route path="/play/movie/:id" component={CinemaPlayer} />
      <Route path="/play/tv/:id/:season/:episode" component={CinemaPlayer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={""}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
