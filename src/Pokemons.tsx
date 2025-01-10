import React, { useState } from "react";
import { matchSorter } from "match-sorter";
import { Header } from "./Header";
import { PokemonItem } from "./PokemonItem";
import { Pokemon } from "./types";
import { withLoader } from "./withLoader";
import { useForceRerender } from "./useForceRerender";
import { Loader } from "./Loader";
import { useQuery } from "@tanstack/react-query";

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const result = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  ).then((res) => res.json());
  return result.results;
};

export function Pokemons() {
  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });
  const [caughtPokemons, setCaughtPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const forceRerender = useForceRerender();

  let visiblePokemons = pokemons.length
    ? matchSorter(pokemons, searchTerm, { keys: ["name"] })
    : [];

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
    <div className="max-h-screen flex flex-col border-r border-r-slate-300 dark:border-r-slate-600 dark:bg-gray-800 overflow-auto">
      <Header
        caughtPokemonsLength={caughtPokemons.length}
        pokemonsLength={pokemons.length}
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        forceRerender={forceRerender}
      />
      <Loader isLoading={isLoading} isError={isError}>
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
