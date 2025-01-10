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
    <div className="flex flex-col gap-2 p-3">
      <aside>Uncaught Pokemons: {pokemonsLength - caughtPokemonsLength}</aside>
      <input
        className="dark:bg-gray-700"
        value={searchTerm}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <button className="dark:bg-gray-700" onClick={forceRerender}>
        Force rerender
      </button>
    </div>
  );
}
