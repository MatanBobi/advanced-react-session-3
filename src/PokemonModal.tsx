import { useQuery } from "@tanstack/react-query";
import { Loader } from "./Loader";

const getPokemonDetails = async (pokemonId: string) => {
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  ).then((res) => res.json());
  return result;
};

export function PokemonModal({ pokemonId }: { pokemonId: string }) {
  const { data: pokemonDetails = {}, isLoading } = useQuery({
    queryKey: ["selectedPokemon", pokemonId],
    queryFn: () => getPokemonDetails(pokemonId),
  });

  return (
    <Loader isLoading={isLoading}>
      <div className="pokemon-modal">
        <div className="pokemon-modal-image">
          {pokemonDetails && pokemonDetails.sprites && (
            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />
          )}
        </div>
        <div>
          <h1>{pokemonDetails?.name}</h1>
          <p>Height: {pokemonDetails?.height}</p>
          <p>Weight: {pokemonDetails?.weight}</p>
        </div>
      </div>
    </Loader>
  );
}
