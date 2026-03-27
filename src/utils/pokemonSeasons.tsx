// src/utils/pokemonSeasons.ts

// 🎨 Color representativo por temporada (1–27)
export const SEASON_COLORS: Record<number, string> = {
  1: '#E53935', // Liga Índigo (Rojo Kanto)
  2: '#FB8C00', // Islas Naranja
  3: '#FDD835', // Liga Johto (Dorado)
  4: '#C0A000', // Campeones Johto (Oro más intenso)
  5: '#43A047', // Búsqueda del Maestro (Johto verde)
  6: '#00897B', // Fuerza Máxima (Hoenn tropical)
  7: '#00ACC1', // Reto Máximo
  8: '#1E88E5', // Batalla Avanzada
  9: '#1565C0', // Batalla de la Frontera (Azul profundo)
  10: '#5E35B1', // Diamante y Perla (Sinnoh violeta frío)
  11: '#3949AB', // Batalla Dimensión
  12: '#283593', // Galactic Battles (Oscuro galáctico)
  13: '#64B5F6', // Liga Sinnoh (Azul hielo)
  14: '#424242', // Blanco y Negro
  15: '#000000', // Rivales del Destino
  16: '#B71C1C', // Aventuras en Teselia
  17: '#EC407A', // XY (Rosa energético)
  18: '#D81B60', // Desafío en Kalos
  19: '#8E24AA', // XYZ
  20: '#F4511E', // Sol y Luna (Naranja solar)
  21: '#FFB300', // Ultraaventuras
  22: '#6D4C41', // Ultraleyendas
  23: '#26A69A', // Viajes Pokémon
  24: '#2E7D32', // Viajes Maestros
  25: '#1B5E20', // Viajes Definitivos
  26: '#7E57C2', // Horizontes
  27: '#512DA8', // Horizontes – La Serie (más profundo)
};

export const getSeasonColor = (season: number): string => {
  return SEASON_COLORS[season] ?? '#999999';
};

// 🏷️ Nombres oficiales en español (1–27)
export const SEASON_NAMES: Record<number, string> = {
  1: 'Liga Índigo',
  2: 'Las Aventuras en las Islas Naranja',
  3: 'Liga Johto',
  4: 'Campeones de la Liga Johto',
  5: 'Búsqueda del Maestro',
  6: 'Fuerza Máxima',
  7: 'Reto Máximo',
  8: 'Batalla Avanzada',
  9: 'Batalla de la Frontera',
  10: 'Diamante y Perla',
  11: 'Batalla Dimensión',
  12: 'Galactic Battles',
  13: 'Los Vencedores de la Liga Sinnoh',
  14: 'Blanco y Negro',
  15: 'Rivales del Destino',
  16: 'Aventuras en Teselia',
  17: 'XY',
  18: 'XY: Desafío en Kalos',
  19: 'XYZ',
  20: 'Sol y Luna',
  21: 'Ultraaventuras',
  22: 'Ultraleyendas',
  23: 'Viajes Pokémon',
  24: 'Viajes Maestros',
  25: 'Viajes Definitivos',
  26: 'Horizontes',
  27: 'Horizontes – La Serie',
};

// 🏷️ Devuelve nombre oficial
export const getSeasonName = (season: number): string => {
  return SEASON_NAMES[season] ?? `Temporada ${season}`;
};

export interface PokemonSticker {
  name: string;
  isStarter: boolean;
  debutEpisode: number;
  pokedex: number;
}

export const seasonPokemon: Record<number, PokemonSticker[]> = {
  1: [
    { name: 'bulbasaur', isStarter: true, debutEpisode: 10, pokedex: 1 },
    { name: 'charmander', isStarter: true, debutEpisode: 11, pokedex: 4 },
    { name: 'squirtle', isStarter: true, debutEpisode: 12, pokedex: 7 },
  ],
  2: [
    { name: 'lapras', isStarter: false, debutEpisode: 86, pokedex: 131 },
    { name: 'charizard', isStarter: true, debutEpisode: 107, pokedex: 6 },
    { name: 'snorlax', isStarter: false, debutEpisode: 96, pokedex: 143 },
  ],
  3: [
    { name: 'chikorita', isStarter: true, debutEpisode: 128, pokedex: 152 },
    { name: 'cyndaquil', isStarter: true, debutEpisode: 143, pokedex: 155 },
    { name: 'totodile', isStarter: true, debutEpisode: 153, pokedex: 158 },
  ],
  4: [
    { name: 'wobbuffet', isStarter: false, debutEpisode: 175, pokedex: 202 },
    { name: 'bayleef', isStarter: true, debutEpisode: 201, pokedex: 153 },
    { name: 'noctowl', isStarter: false, debutEpisode: 184, pokedex: 164 },
  ],
  5: [
    { name: 'phanpy', isStarter: false, debutEpisode: 232, pokedex: 231 },
    { name: 'pikachu', isStarter: false, debutEpisode: 212, pokedex: 25 },
    { name: 'larvitar', isStarter: false, debutEpisode: 260, pokedex: 246 },
  ],
  6: [
    { name: 'treecko', isStarter: true, debutEpisode: 283, pokedex: 252 },
    { name: 'torchic', isStarter: true, debutEpisode: 277, pokedex: 255 },
    { name: 'mudkip', isStarter: true, debutEpisode: 301, pokedex: 258 },
  ],
  7: [
    { name: 'grovyle', isStarter: true, debutEpisode: 342, pokedex: 253 },
    { name: 'swellow', isStarter: false, debutEpisode: 356, pokedex: 277 },
    { name: 'torkoal', isStarter: false, debutEpisode: 334, pokedex: 324 },
  ],
  8: [
    { name: 'corphish', isStarter: false, debutEpisode: 369, pokedex: 341 },
    { name: 'snorunt', isStarter: true, debutEpisode: 384, pokedex: 361 },
    { name: 'glalie', isStarter: false, debutEpisode: 386, pokedex: 362 },
  ],
  9: [
    { name: 'sceptile', isStarter: true, debutEpisode: 426, pokedex: 254 },
    { name: 'charizard', isStarter: true, debutEpisode: 422, pokedex: 6 },
    { name: 'snorlax', isStarter: false, debutEpisode: 428, pokedex: 143 },
  ],
  10: [
    { name: 'turtwig', isStarter: true, debutEpisode: 471, pokedex: 387 },
    { name: 'chimchar', isStarter: true, debutEpisode: 468, pokedex: 390 },
    { name: 'piplup', isStarter: true, debutEpisode: 468, pokedex: 393 },
  ],
  11: [
    { name: 'buizel', isStarter: false, debutEpisode: 507, pokedex: 418 },
    { name: 'monferno', isStarter: true, debutEpisode: 562, pokedex: 391 },
    { name: 'grotle', isStarter: true, debutEpisode: 567, pokedex: 388 },
  ],
  12: [
    { name: 'infernape', isStarter: true, debutEpisode: 631, pokedex: 392 },
    { name: 'gliscor', isStarter: false, debutEpisode: 531, pokedex: 472 },
    { name: 'gible', isStarter: false, debutEpisode: 625, pokedex: 443 },
  ],
  13: [
    { name: 'torterra', isStarter: true, debutEpisode: 634, pokedex: 389 },
    { name: 'staraptor', isStarter: false, debutEpisode: 585, pokedex: 398 },
    { name: 'infernape', isStarter: true, debutEpisode: 631, pokedex: 392 },
  ],
  14: [
    { name: 'snivy', isStarter: true, debutEpisode: 661, pokedex: 495 },
    { name: 'tepig', isStarter: true, debutEpisode: 663, pokedex: 498 },
    { name: 'oshawott', isStarter: true, debutEpisode: 660, pokedex: 501 },
  ],
  15: [
    { name: 'pignite', isStarter: true, debutEpisode: 739, pokedex: 499 },
    { name: 'krookodile', isStarter: false, debutEpisode: 751, pokedex: 553 },
    { name: 'leavanny', isStarter: false, debutEpisode: 733, pokedex: 542 },
  ],
  16: [
    { name: 'oshawott', isStarter: true, debutEpisode: 723, pokedex: 501 },
    { name: 'snivy', isStarter: true, debutEpisode: 724, pokedex: 495 },
    { name: 'unfezant', isStarter: false, debutEpisode: 727, pokedex: 521 },
  ],
  17: [
    { name: 'chespin', isStarter: true, debutEpisode: 804, pokedex: 650 },
    { name: 'fennekin', isStarter: true, debutEpisode: 804, pokedex: 653 },
    { name: 'froakie', isStarter: true, debutEpisode: 804, pokedex: 656 },
  ],
  18: [
    { name: 'frogadier', isStarter: true, debutEpisode: 855, pokedex: 657 },
    { name: 'talonflame', isStarter: false, debutEpisode: 889, pokedex: 663 },
    { name: 'hawlucha', isStarter: false, debutEpisode: 838, pokedex: 701 },
  ],
  19: [
    { name: 'greninja', isStarter: true, debutEpisode: 903, pokedex: 658 },
    { name: 'noivern', isStarter: false, debutEpisode: 913, pokedex: 715 },
    { name: 'goodra', isStarter: false, debutEpisode: 873, pokedex: 706 },
  ],
  20: [
    { name: 'popplio', isStarter: true, debutEpisode: 942, pokedex: 728 },
    { name: 'litten', isStarter: true, debutEpisode: 942, pokedex: 725 },
    { name: 'rowlet', isStarter: true, debutEpisode: 945, pokedex: 722 },
  ],
  21: [
    { name: 'lycanroc', isStarter: false, debutEpisode: 978, pokedex: 745 },
    { name: 'torracat', isStarter: true, debutEpisode: 1004, pokedex: 726 },
    { name: 'rowlet', isStarter: true, debutEpisode: 963, pokedex: 722 },
  ],
  22: [
    { name: 'incineroar', isStarter: true, debutEpisode: 1083, pokedex: 727 },
    { name: 'melmetal', isStarter: false, debutEpisode: 1076, pokedex: 809 },
    { name: 'lycanroc', isStarter: false, debutEpisode: 1008, pokedex: 745 },
  ],
  23: [
    { name: 'dragonite', isStarter: false, debutEpisode: 1099, pokedex: 149 },
    { name: 'gengar', isStarter: false, debutEpisode: 1105, pokedex: 94 },
    { name: 'lucario', isStarter: false, debutEpisode: 1134, pokedex: 448 },
  ],
  24: [
    { name: 'dracovish', isStarter: false, debutEpisode: 1139, pokedex: 882 },
    { name: 'sirfetchd', isStarter: false, debutEpisode: 1149, pokedex: 865 },
    { name: 'lucario', isStarter: false, debutEpisode: 1134, pokedex: 448 },
  ],
  25: [
    { name: 'dracovish', isStarter: false, debutEpisode: 1139, pokedex: 882 },
    { name: 'lucario', isStarter: false, debutEpisode: 1134, pokedex: 448 },
    { name: 'pikachu', isStarter: false, debutEpisode: 1136, pokedex: 25 },
  ],
  26: [
    { name: 'sprigatito', isStarter: true, debutEpisode: 1233, pokedex: 906 },
    { name: 'fuecoco', isStarter: true, debutEpisode: 1233, pokedex: 909 },
    { name: 'quaxly', isStarter: true, debutEpisode: 1233, pokedex: 912 },
  ],
  27: [
    { name: 'quaxwell', isStarter: true, debutEpisode: 1275, pokedex: 913 },
    { name: 'floragato', isStarter: true, debutEpisode: 1276, pokedex: 907 },
    { name: 'terapagos', isStarter: false, debutEpisode: 1274, pokedex: 1024 },
  ],
};
