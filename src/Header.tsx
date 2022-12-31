export function Header({
  pokemonsLength,
  caughtPokemonsLength,
  onChangeSearch,
  searchTerm,
  forceRerender,
}: {
  pokemonsLength: number;
  caughtPokemonsLength: number;
  onChangeSearch: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  forceRerender: () => void;
}) {
  return (
    <>
      <aside>Uncaught Pokemons: {pokemonsLength - caughtPokemonsLength}</aside>
      <input
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <button onClick={forceRerender}>Force rerender</button>
    </>
  );
}
