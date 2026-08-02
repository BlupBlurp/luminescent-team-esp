/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
 docs: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introducción',
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'Preguntas frecuentes',
    },
    {
      type: 'category',
      label: 'Guía de Instalación',
      link: {
        type: 'generated-index',
        slug: 'category/installation',
       description: 'Instrucciones completas para instalar Platino Luminiscente en varias plataformas compatibles. Recomendamos usar hardware, o Ryujinx si tu máquina es lo bastante potente para ello.',
      },
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'installation/atmosphere',
          label: 'Atmosphere',
        },
        {
          type: 'doc',
          id: 'installation/ryujinx',
          label: 'Ryujinx',
        },
        {
          type: 'doc',
          id: 'installation/android',
          label: 'Android',
        },
      ],
    },
  {
      type: 'doc',
      id: 'features',
      label: 'Características',
    },
  {
      type: 'doc',
      id: 'incense-regional',
      label: 'Incienso y Regionales',
    },
  {
      type: 'category',
      label: 'Pokémon Especiales',
      link: {
        type: 'generated-index',
        slug: 'category/special-events',
        description: 'Descubre dónde conseguir Pokémon especiales en Platino Luminiscente. ¡Siempre que es posible, la caza de shinys se ha facilitado al máximo para tu comodidad!',
      },
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'special-events/gifts',
          label: 'Pokémon de Regalo',
        },
        {
          type: 'doc',
          id: 'special-events/static',
          label: 'Encuentros Estáticos',
        },
        {
          type: 'doc',
          id: 'special-events/legendaries',
          label: 'Encuentros Legendarios',
        },
        {
          type: 'doc',
          id: 'special-events/trade',
          label: 'Intercambios',
        },
      ],
    },
  {
      type: 'doc',
      id: 'evolutions',
      label: 'Evoluciones',
    },
  {
      type: 'doc',
      id: 'npc',
      label: 'NPCs Útiles',
    },
  {
      type: 'doc',
      id: 'items',
      label: 'Objetos y MTs',
    },
  {
      type: 'doc',
      id: 'pickup',
      label: 'Cambios de Recogida',
    },
  {
      type: 'doc',
      id: 'mods',
      label: 'Mods PreIncluidos',
    },
  {
      type: 'doc',
      id: 'changelog',
      label: 'Registro de Cambios',
    },
  ],
  };
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */


module.exports = sidebars ;
