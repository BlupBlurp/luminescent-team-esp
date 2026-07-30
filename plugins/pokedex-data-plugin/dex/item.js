const { GAMEDATA2, GAMEDATAV, ItemNames, ItemTable } = require('../../../__gamedata');
const { getTypeIdFromTypeName, getTypeName } = require('./types');

function getItemIdFromItemName(itemName, mode = GAMEDATA2) {
  if (!itemName) throw Error(`Bad item name: ${itemName}`);
  const ModeItemNames = ItemNames[mode];
  if (itemName === "King's Rock")
    return ModeItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === 'King’s Rock');
  const index = ModeItemNames.labelDataArray.findIndex((e) => e.wordDataArray[0]?.str === itemName);
  if (index === -1) throw Error(`Bad item name: ${itemName}`);
  return index;
}

function getItemString(itemId = 1, mode = GAMEDATA2) {
  const ModeItemNames = ItemNames[mode];
  if (itemId > ModeItemNames.labelDataArray.length) {
    throw Error(`Bad Item Number: ${itemId}`)
  }
  const itemObject = ModeItemNames.labelDataArray[itemId]
  try {
    itemObject.wordDataArray[0].str;
  } catch (error) {
    throw Error(`This Item does not have name data: ${itemId} ${JSON.stringify(itemObject, undefined, 4)}`);
  }
  return itemObject.wordDataArray[0].str;
}

function getAllItems(mode = GAMEDATA2) {
  const ModeItemNames = ItemNames[mode];

  if (!ModeItemNames?.labelDataArray) {
    throw new Error(`Invalid ItemNames table for mode: ${mode}`);
  }

  
  return ModeItemNames.labelDataArray
    .map((label, itemId) => {
      const name = label?.wordDataArray?.[0]?.str;
      if (!name) return null;

      const itemProperties = getItemProperties(itemId, mode)
      if (is31stBitSet(itemProperties.flags0)) {
        return null;
      }
      return {
        id: itemId,
        name,
      };
    })
    .filter(Boolean) // remove null / invalid entries
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
}

function is31stBitSet(value) {
  return ((value >>> 31) & 1) === 1;
}

function getItemProperties(itemId = 1, mode = GAMEDATA2) {
  const ModeItemTable = ItemTable[mode];
  const itemTableArray = ModeItemTable.Item;

  if (itemId > itemTableArray.length) {
    throw Error(`Bad Item Number: ${itemId}`)
  }

  const itemPropertyObject = itemTableArray[itemId];
  return itemPropertyObject;
}

function getItemImageUrl(itemName = "", mode = GAMEDATA2) {
  if (!itemName || itemName === "None") {
    return `/img/items/Item_None.webp`;
  }

  try {
    // Primary: look up the item in the current mode's language data,
    // then convert to the English filename.
    const itemId = getItemIdFromItemName(itemName, mode);
    const englishItemName = getItemString(itemId, GAMEDATAV);
    const splitItemName = englishItemName.replace(/['’]/g, "").split(" ").join("_");
    return `/img/items/Item_${splitItemName}.webp`;
  } catch (error) {
    // Fallback 1: if the current mode's data is unavailable (e.g., in a
    // client-side recovery render where webpack didn't bundle the JSON),
    // try the vanilla English data which is more likely to be available.
    try {
      const itemId = getItemIdFromItemName(itemName, GAMEDATAV);
      const englishItemName = getItemString(itemId, GAMEDATAV);
      const splitItemName = englishItemName.replace(/['’]/g, "").split(" ").join("_");
      return `/img/items/Item_${splitItemName}.webp`;
    } catch (secondError) {
      // Fallback 2: last resort — construct a filename from the item name
      // directly. This may produce a file that doesn't exist, but
      // ImageWithFallback will handle the 404 gracefully.
      const splitItemName = itemName.replace(/['’]/g, "").split(" ").join("_");
      return `/img/items/Item_${splitItemName}.webp`;
    }
  }
}

function getTMImageUrl(moveType="", mode = GAMEDATA2) {
  if (!moveType) {
    return `/img/tms/Normal.webp`;
  }

  try {
    // Primary: convert localized type names to English for the TM image filename
    const typeId = getTypeIdFromTypeName(moveType, mode);
    const englishTypeName = getTypeName(typeId, GAMEDATAV);
    return `/img/tms/${englishTypeName}.webp`;
  } catch (error) {
    // Fallback 1: try the vanilla English data
    try {
      const typeId = getTypeIdFromTypeName(moveType, GAMEDATAV);
      const englishTypeName = getTypeName(typeId, GAMEDATAV);
      return `/img/tms/${englishTypeName}.webp`;
    } catch (secondError) {
      // Fallback 2: use the moveType string directly
      return `/img/tms/${moveType}.webp`;
    }
  }
}
module.exports = { getItemIdFromItemName, getItemString, getItemImageUrl, getTMImageUrl, getAllItems };
