const { PersonalTable, GAMEDATA2, GAMEDATA3 } = require('../../../__gamedata');

const EGG_GROUPS = {
  0: 'None',
  1: 'Monstruo',
  2: 'Agua 1',
  3: 'Bicho',
  4: 'Volador',
  5: 'Campo',
  6: 'Hada',
  7: 'Planta',
  8: 'Humanoide',
  9: 'Agua 3',
  10: 'Mineral',
  11: 'Amorfo',
  12: 'Agua 2',
  13: 'Ditto',
  14: 'Dragón',
  15: 'Desconocido',
};

const POKEMON_IDS_BY_EGG_GROUP = PersonalTable[GAMEDATA2].Personal.reduce((pokemonMap, currentPokemon) => {
  return createPokemonByEggGroupMap(pokemonMap, currentPokemon);
}, {});
const POKEMON_IDS_BY_EGG_GROUP3 = PersonalTable[GAMEDATA3].Personal.reduce((pokemonMap, currentPokemon) => {
  return createPokemonByEggGroupMap(pokemonMap, currentPokemon);
}, {});

const HIGHEST_EGG_GROUP_ID = 15;

function getEggGroupViaPokemonId(pokemonId = 0, mode = GAMEDATA2) {
  const ModePersonalTable = PersonalTable[mode];
  if (!Number.isInteger(pokemonId) || pokemonId < 0 || pokemonId > ModePersonalTable.Personal.length)
    throw new Error(`Bad pokemonId: ${pokemonId}`);

  const pokemonDetails = ModePersonalTable.Personal[pokemonId];
  const eggGroup1 = pokemonDetails.egg_group1;
  const eggGroup2 = pokemonDetails.egg_group2;
  return eggGroup1 === eggGroup2 ? [eggGroup1] : [eggGroup1, eggGroup2];
}

function getEggGroupNameById(eggGroupId = 0) {
  if (!Number.isInteger(eggGroupId) || eggGroupId < 0 || eggGroupId > HIGHEST_EGG_GROUP_ID)
    throw new Error(`Bad eggGroupId: ${eggGroupId}`);
  return EGG_GROUPS[eggGroupId];
}

function createPokemonByEggGroupMap(pokemonMap, currentPokemon) {
  //Use sets so I don't have to handle duplicates, looking at you Unown
  if (pokemonMap[currentPokemon.egg_group1] === undefined) {
    pokemonMap[currentPokemon.egg_group1] = new Set();
  }

  if (pokemonMap[currentPokemon.egg_group2] === undefined) {
    pokemonMap[currentPokemon.egg_group2] = new Set();
  }

  pokemonMap[currentPokemon.egg_group1].add(currentPokemon.id);
  pokemonMap[currentPokemon.egg_group2].add(currentPokemon.id);
  return pokemonMap;
}

function getPokemonIdsInEggGroup(eggGroupId = 0, mode = GAMEDATA2) {
  if (!Number.isInteger(eggGroupId) || eggGroupId < 0 || eggGroupId > HIGHEST_EGG_GROUP_ID)
    throw new Error(`Bad eggGroupId: ${eggGroupId}`);
  const PokemonByEggGroups = mode === GAMEDATA2 ? POKEMON_IDS_BY_EGG_GROUP : POKEMON_IDS_BY_EGG_GROUP3
  return Array.from(PokemonByEggGroups[eggGroupId]); //Back to array for easier handling
}

module.exports = { getPokemonIdsInEggGroup, getEggGroupNameById, getEggGroupViaPokemonId, EGG_GROUPS };
