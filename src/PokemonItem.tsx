import React from "react";
import { Pokemon } from "./types";
import { getMainImageUrl } from "./utils";
import { Modal } from "./Modal/Modal";
import { ModalButton } from "./Modal/ModalButton";
import { ModalContent } from "./Modal/ModalContent";
import { PokemonModal } from "./PokemonModal";
import { InfoIcon } from "./assets/InfoIcon";

export const PokemonItem = React.memo(
  ({
    pokemon,
    onChange,
    isCaught,
  }: {
    pokemon: Pokemon;
    onChange: (pokemon: Pokemon, caught: boolean) => void;
    isCaught: boolean;
  }) => {
    return (
      <div className="px-4 py-5 border-t border-t-slate-300 hover:bg-slate-200 font-medium dark:border-t-gray-600 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img
            className="w-10"
            src={getMainImageUrl(pokemon.name)}
            alt={pokemon.name}
          />
          <span className="capitalize">{pokemon.name}</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isCaught}
            onChange={() => {
              onChange(pokemon, !isCaught);
            }}
          />
          <Modal>
            <ModalButton>
              <InfoIcon style={{ height: 24, width: 24 }} alt="info" />
            </ModalButton>
            <ModalContent>
              <PokemonModal pokemonId={pokemon.name} />
            </ModalContent>
          </Modal>
        </div>
      </div>
    );
  }
);
