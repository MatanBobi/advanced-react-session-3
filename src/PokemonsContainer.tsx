import React, { useState } from "react";
import { matchSorter } from "match-sorter";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useNetworkStatus } from "./useNetworkStatus";
import { withLoader } from "./withLoader";
import { useForceRerender } from "./useForceRerender";

export function PokemonsContainer({
  data: { results: pokemons },
}: {
  data: { results: Pokemon[] };
}) {
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOnline } = useNetworkStatus();
  const forceRerender = useForceRerender();

  let visiblePokemons = matchSorter(pokemons, searchTerm, { keys: ["name"] });

  const handlePokemonCaught = (pokemon: Pokemon, caught: boolean) => {
    setCaughtPokemons((prev) => {
      if (caught) {
        if (prev.includes(pokemon)) {
          return prev;
        }

        return [...prev, pokemon];
      } else {
        return prev.filter((item) => item !== pokemon);
      }
    });
  };

  return (
    <div>
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        forceRerender={forceRerender}
      />
      {visiblePokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.name}
          pokemon={pokemon}
          onChange={handlePokemonCaught}
          disabled={!isOnline}
          isCaught={caughtPokemons.includes(pokemon)}
        />
      ))}
      {!isOnline ? (
        <div
          className="network-status-message"
          role="status"
          aria-live="polite"
        >
          You're offline
        </div>
      ) : null}
    </div>
  );
}

export const PokemonsContainerWithLoader = withLoader(
  PokemonsContainer,
  "https://pokeapi.co/api/v2/pokemon?limit=1154"
);
