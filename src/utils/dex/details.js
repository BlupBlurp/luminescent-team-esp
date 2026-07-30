import { PokemonHeight, PokemonWeight, GAMEDATA2 } from '../../../__gamedata';

const FEET_TO_CM = 30.48;
const INCHES_TO_CM = 2.54;
const POUNDS_TO_KG = 0.453592;

function parseLocalizedDecimal(value) {
  const normalized = value.replace(/[^0-9,]/g, '').replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getHeight(pokemonId = 0, mode = GAMEDATA2) {
  const ModePokemonHeight = PokemonHeight[mode];
  const heightString = ModePokemonHeight.labelDataArray[pokemonId]?.wordDataArray[0]?.str ?? null;

  if (heightString === null) return '0';

  // Spanish/Metric format: "0,7 m"
  if (heightString.includes('m') && !heightString.includes("'")) {
    const meters = parseLocalizedDecimal(heightString);
    return meters.toFixed(2);
  }

  const [feetString, inchesString] = heightString.split("'");
  const inches = parseFloat(inchesString.substring(0, inchesString.length - 1));
  const feet = parseInt(feetString);

  const feetInCentimeters = feet * FEET_TO_CM;
  const inchesInCentimeters = inches * INCHES_TO_CM;
  return ((feetInCentimeters + inchesInCentimeters) / 100).toFixed(2);
}

function getWeight(pokemonId = 0, mode = GAMEDATA2) {
  const ModePokemonWeight = PokemonWeight[mode];
  const weightString = ModePokemonWeight.labelDataArray[pokemonId]?.wordDataArray[0]?.str || null;

  if (weightString === null) return '0';

  // Spanish/Metric format: "6,9 kg"
  if (weightString.includes('kg')) {
    const kilograms = parseLocalizedDecimal(weightString);
    return kilograms.toFixed(2);
  }

  const [poundsString] = weightString.split(' ');
  const pounds = parseFloat(poundsString.trim());

  const poundsInKilogram = pounds * POUNDS_TO_KG;
  return poundsInKilogram.toFixed(2);
}

export { getHeight, getWeight };
