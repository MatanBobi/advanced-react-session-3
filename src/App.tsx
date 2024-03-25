import { PokemonsContainer } from "./PokemonsContainer";
import "./App.css";
import { NetworkStatusProvider } from "./NetworkStatusProvider";

function App() {
  return (
    <div className="App">
      <NetworkStatusProvider>
        <PokemonsContainer />
      </NetworkStatusProvider>
    </div>
  );
}

export default App;
