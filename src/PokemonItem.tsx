import { Pokemon } from "./types";
import infoIcon from "./assets/info.svg";
import { Modal } from "./Modal/Modal";
import { ModalButton } from "./Modal/ModalButton";
import { ModalContent } from "./Modal/ModalContent";
import { PokemonModal } from "./PokemonModal";

function sleep(ms: number) {
  const start = Date.now();
  while (Date.now() < start + ms);
}

export function PokemonItem({
  pokemon,
  onChange,
  isCaught,
  disabled,
}: {
  pokemon: Pokemon;
  onChange: (pokemon: Pokemon, caught: boolean) => void;
  isCaught: boolean;
  disabled: boolean;
}) {
  sleep(1);
  return (
    <div className="pokemon-row">
      <span
        onClick={() => {
          if (disabled) return;
          onChange(pokemon, !isCaught);
        }}
      >
        {pokemon.name}
      </span>
      <input
        disabled={disabled}
        type="checkbox"
        checked={isCaught}
        onChange={() => {
          onChange(pokemon, !isCaught);
        }}
      />
      {/* <Modal>
        <ModalButton>
          <img src={infoIcon} style={{ height: 24, width: 24 }} alt="info" />
        </ModalButton>
        <ModalContent>
          <PokemonModal pokemonId={pokemon.name} />
        </ModalContent>
      </Modal> */}
    </div>
  );
}
