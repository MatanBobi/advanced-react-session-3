import React, { useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { create } from "zustand";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useNetworkStatus } from "./useNetworkStatus";
import { useForceRerender } from "./useForceRerender";

interface PokemonState {
  pokemons: Pokemon[];
  isLoading: boolean;
  fetchPokemons: () => Promise<void>;
}

const usePokemonsStore = create<PokemonState>((set) => ({
  pokemons: [],
  isLoading: false,
  fetchPokemons: async () => {
    set({ isLoading: true });
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    set({ pokemons: data.results, isLoading: false });
  },
}));

export function PokemonsContainer() {
  const isLoading = usePokemonsStore((state) => state.isLoading);
  const pokemons = usePokemonsStore((state) => state.pokemons);
  const fetchPokemons = usePokemonsStore((state) => state.fetchPokemons);
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOnline } = useNetworkStatus();
  const forceRerender = useForceRerender();

  useEffect(() => {
    fetchPokemons();
  }, []);
  const visiblePokemons = React.useMemo(() => {
    return pokemons.length
      ? matchSorter(pokemons, searchTerm, { keys: ["name"] })
      : [];
  }, [pokemons, searchTerm]);

  const handlePokemonCaught = React.useCallback(
    (pokemon: Pokemon, caught: boolean) => {
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
    },
    [pokemons]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        forceRerender={forceRerender}
      />
      <>
        {visiblePokemons.map((pokemon) => {
          return (
            <PokemonItem
              key={pokemon.name}
              pokemon={pokemon}
              onChange={handlePokemonCaught}
              disabled={!isOnline}
              isCaught={caughtPokemons.includes(pokemon)}
            />
          );
        })}
      </>
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
