const { GAMEDATA2, GAMEDATAV, ItemNames, ItemTable } = require('../../../__gamedata');

const ITEM_IMAGE_FALLBACK = '/img/items/Item_TM.webp';
const ITEM_IMAGE_OVERRIDES = {
  'Macho Brace': ITEM_IMAGE_FALLBACK,
  'Macho_Brace': ITEM_IMAGE_FALLBACK,
  "Leader's Crest": ITEM_IMAGE_FALLBACK,
  'Leaders_Crest': ITEM_IMAGE_FALLBACK,
  None: ITEM_IMAGE_FALLBACK,
};

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
    return ITEM_IMAGE_FALLBACK;
  }

  const normalizedItemName = itemName.replace(/['’]/g, "").split(" ").join("_");
  const override = ITEM_IMAGE_OVERRIDES[itemName] || ITEM_IMAGE_OVERRIDES[normalizedItemName];
  if (override) {
    return override;
  }

  const getItemAsset = (resolvedName) => {
    const splitItemName = resolvedName.replace(/['’]/g, "").split(" ").join("_");
    return `/img/items/Item_${splitItemName}.webp`;
  };

  try {
    // TODO - This is a temporary fix for the issue where the item name is not in English. We should find a better way to handle this in the future.
    const itemId = getItemIdFromItemName(itemName, mode);
    const englishItemName = getItemString(itemId, GAMEDATAV);
    return getItemAsset(englishItemName);
  } catch (error) {
    return getItemAsset(normalizedItemName);
  }
}

function getTMImageUrl(moveType="") {
  return `/img/tms/${moveType}.webp`
}
module.exports = { getItemIdFromItemName, getItemString, getItemImageUrl, getTMImageUrl, getAllItems };
