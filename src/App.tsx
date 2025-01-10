import "./App.css";
import { Pokemons } from "./Pokemons";
import { OnlineIndicator } from "./OnlineIndicator";
import { withNetworkStatus } from "./withNetworkStatus";

function App() {
  return (
    <div className="layout dark:bg-gray-800  dark:text-white h-full">
      <Pokemons />
      <OnlineIndicator />
    </div>
  );
}

export default withNetworkStatus(App);
