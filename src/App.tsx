import { PokemonsContainerWithLoader } from "./PokemonsContainer";
import "./App.css";
import { NetworkStatusProvider } from "./NetworkStatusProvider";

function App() {
  return (
    <div className="App">
      <NetworkStatusProvider>
        <PokemonsContainerWithLoader />
      </NetworkStatusProvider>
    </div>
  );
}

export default App;
