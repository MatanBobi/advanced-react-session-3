import React, { useEffect, useState } from "react";
import { matchSorter } from "match-sorter";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { useForceRerender } from "./useForceRerender";
import { Loader } from "./Loader";
import { create } from "zustand";

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const result = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  ).then((res) => res.json());
  return result.results;
};

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
    const results = await fetchPokemons();
    set({ pokemons: results, isLoading: false });
  },
}));

export function Pokemons() {
  const isLoading = usePokemonsStore((state) => state.isLoading);
  const pokemons = usePokemonsStore((state) => state.pokemons);
  const fetchPokemons = usePokemonsStore((state) => state.fetchPokemons);
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    []
  );

  return (
    <div className="max-h-screen flex flex-col border-r border-r-slate-300 dark:border-r-slate-600 dark:bg-gray-800 overflow-auto">
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        forceRerender={forceRerender}
      />
      <Loader isLoading={isLoading}>
        {visiblePokemons.map((pokemon) => (
          <PokemonItem
            key={pokemon.name}
            pokemon={pokemon}
            onChange={handlePokemonCaught}
            isCaught={caughtPokemons.includes(pokemon)}
          />
        ))}
      </Loader>
    </div>
  );
}
