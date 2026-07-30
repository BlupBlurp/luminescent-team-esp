import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { getPokemon } from "../../../plugins/pokedex-data-plugin/dex/pokemon";
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getItemImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';
import { useGlobalState } from '../common/GlobalState';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { GAMEDATA2 } from '../../../__gamedata';

const noneItems = ["None", "Ningún objeto"]
export const PokemonItems = ({ item1, item2, item3 }) => {
  const [globalState] = useGlobalState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const noItems = noneItems.includes(item1) && noneItems.includes(item2) && noneItems.includes(item3)
  const allItems = !noneItems.includes(item1) && !noneItems.includes(item2) && !noneItems.includes(item3)

  return (
    <div>
      <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1}>
        <>
          <Box gridColumn="span 5">
            <Typography
              sx={{
                textDecoration: (!allItems && !noItems) ? 'underline' : "",
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: (!allItems && !noItems) ? 'pointer' : null,
              }}
              onClick={handleOpen}
            >
              Objetos en encuentros salvajes:
            </Typography>
          </Box>
        </>
        {(!noneItems.includes(item1) && !allItems) && (<ItemContainer item={item1} percentage={50} mode={globalState.mode} />)}
        {(!noneItems.includes(item3) && !allItems) && (<ItemContainer item={item3} percentage={45} mode={globalState.mode} />)}
        {(!noneItems.includes(item2) && !allItems) && (<ItemContainer item={item2} percentage={5} mode={globalState.mode} />)}
        {noItems && (
          <>
            <Box gridColumn="span 5">
              <Typography >This Pokémon does not hold items in the wild</Typography>
            </Box>
          </>
        )}
        {allItems && (
          <ItemContainer item={item1} percentage={100} mode={globalState.mode} />
        )}
        {(!allItems && !noItems) && (
          <Modal open={open} onClose={handleClose}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'var(--ifm-color-content-inverse)',
              color: 'var(--ifm-color-content)',
              padding: '16px',
              borderRadius: '8px',
              border: 'var(--ifm-table-border-width) solid var(--ifm-table-border-color)',
            }}
            >
              <Box display="grid" gridTemplateColumns="repeat(3)" gap={1}>
                <Box gridColumn="span 3">
                  <Typography >
                    If the Lead Pokémon has Frisk,<br />
                    Super Luck or Compound Eyes:
                  </Typography>
                </Box>
                {(!noneItems.includes(item1) && !allItems) && (<ItemContainer item={item1} percentage={60} span='span 1' mode={globalState.mode} />)}
                {(!noneItems.includes(item3) && !allItems) && (<ItemContainer item={item3} percentage={20} span='span 1' mode={globalState.mode} />)}
                {(!noneItems.includes(item2) && !allItems) && (<ItemContainer item={item2} percentage={20} span='span 1' mode={globalState.mode} />)}
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </div>
  );
};

const ItemContainer = ({item, percentage, span='span 2', mode=GAMEDATA2}) => {
  return (
    <>
      <Box gridColumn={span} display="flex" alignItems={"center"} sx={{marginLeft: "16px"}}>
        <Typography >{percentage}%: {item}</Typography>
      </Box>
      <Box gridColumn={span}>
        <ImageWithFallback
          key={item}
          src={useBaseUrl(`${getItemImageUrl(item, mode)}`)}
          fallbackSrc={`/img/pkm/pm0000_00_00_00_L.webp`}
          width="40"
          alt={item}
          title={item}
        />
      </Box>
      <Box gridColumn="span 1" />
    </>
  )
}
