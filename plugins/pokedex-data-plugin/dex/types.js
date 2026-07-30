const { TypeName, GAMEDATA2 } = require('../../../__gamedata');

function getTypeName(typeId = 0, mode = GAMEDATA2) {
  const ModeTypeName = TypeName[mode];
  const type = ModeTypeName.labelDataArray[typeId]?.wordDataArray[0]?.str;
  if (!type) throw Error(`Bad typeId: ${typeId}`);
  return type;
}

function getTypeIdFromTypeName(typeName, mode = GAMEDATA2) {
  if (!typeName) throw Error(`Bad type name: ${typeName}`);
  const ModeTypeName = TypeName[mode];
  const index = ModeTypeName.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === typeName);
  if (index === -1) throw Error(`Bad type name: ${typeName}`);
  return index;
}

function getTypes(pokemonObject, mode = GAMEDATA2) {
  return pokemonObject.type1 === pokemonObject.type2
    ? [getTypeName(pokemonObject.type1, mode)]
    : [getTypeName(pokemonObject.type1, mode), getTypeName(pokemonObject.type2, mode)];
}

module.exports = { getTypeName, getTypeIdFromTypeName, getTypes };
