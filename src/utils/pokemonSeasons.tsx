// src/utils/pokemonSeasons.ts
import {
  BulbasaurSticker,
  CharmanderSticker,
  SquirtleSticker,
  CharizardSticker,
  LaprasSticker,
  SnorlaxSticker,
  ChikoritaSticker,
  CyndaquilSticker,
  TotodileSticker,
  BayleefSticker,
  NoctowlSticker,
  PhanpySticker,
  PikachuSticker,
  MudkipSticker,
  TorchicSticker,
  TreeckoSticker,
  GrovyleSticker,
  SwellowSticker,
  TorkoalSticker,
  CorphishSticker,
  GlalieSticker,
  SceptileSticker,
  CharizardS9Sticker,
  SnorlaxS9Sticker,
  PiplupSticker,
  ChimcharSticker,
  TurtwigSticker,
  BuizelSticker,
  MonfernoSticker,
  GrotleSticker,
  InfernapeSticker,
  GliscorSticker,
  GibleSticker,
  TorterraSticker,
  StaraptorSticker,
  OshawottSticker,
  TepigSticker,
  SnivySticker,
  PigniteSticker,
  KrookodileSticker,
  LeavannySticker,
  UnfezantSticker,
  FroakieSticker,
  FennekinSticker,
  ChespinSticker,
  FrogadierSticker,
  TalonflameSticker,
  HawluchaSticker,
  GreninjaSticker,
  NoivernSticker,
  GoodraSticker,
  PopplioSticker,
  LittenSticker,
  RowletSticker,
  LycanrocSticker,
  TorracatSticker,
  IncineroarSticker,
  MelmetalSticker,
  DragoniteSticker,
  GengarSticker,
  LucarioSticker,
  DracovishSticker,
  SirfetchdSticker,
  QuaxlySticker,
  FuecocoSticker,
  SprigatitoSticker,
  QuaxwellSticker,
  FloragatoSticker,
  TerapagosSticker,
  LarvitarSticker,
  InfernapeSticker13,
  SnivySticker16,
  OshawottSticker16,
  RowletSticker21,
  LycanrocSticker22,
  LucarioSticker24,
  LucarioSticker25,
  DracovishSticker25,
  PikachuSticker25,
  WobbuffetSticker,
  SnoruntSticker,
} from './pokemonStickers';

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
  img: string;
  isStarter: boolean;
  debutEpisode: number;
}

export const seasonPokemon: Record<number, PokemonSticker[]> = {
  1: [
    {
      name: 'bulbasaur',
      img: BulbasaurSticker,
      isStarter: true,
      debutEpisode: 10,
    },
    {
      name: 'charmander',
      img: CharmanderSticker,
      isStarter: true,
      debutEpisode: 11,
    },
    {
      name: 'squirtle',
      img: SquirtleSticker,
      isStarter: true,
      debutEpisode: 12,
    },
  ],
  2: [
    { name: 'lapras', img: LaprasSticker, isStarter: false, debutEpisode: 86 },
    {
      name: 'charizard',
      img: CharizardSticker,
      isStarter: true,
      debutEpisode: 107,
    },
    {
      name: 'snorlax',
      img: SnorlaxSticker,
      isStarter: false,
      debutEpisode: 96,
    },
  ],
  3: [
    {
      name: 'chikorita',
      img: ChikoritaSticker,
      isStarter: true,
      debutEpisode: 128,
    },
    {
      name: 'cyndaquil',
      img: CyndaquilSticker,
      isStarter: true,
      debutEpisode: 143,
    },
    {
      name: 'totodile',
      img: TotodileSticker,
      isStarter: true,
      debutEpisode: 153,
    },
  ],
  4: [
    {
      name: 'wobbuffet',
      img: WobbuffetSticker,
      isStarter: false,
      debutEpisode: 175,
    },
    {
      name: 'bayleef',
      img: BayleefSticker,
      isStarter: true,
      debutEpisode: 201,
    },
    {
      name: 'noctowl',
      img: NoctowlSticker,
      isStarter: false,
      debutEpisode: 184,
    },
  ],
  5: [
    { name: 'phanpy', img: PhanpySticker, isStarter: false, debutEpisode: 232 },
    {
      name: 'pikachu',
      img: PikachuSticker,
      isStarter: false,
      debutEpisode: 212,
    },
    {
      name: 'larvitar',
      img: LarvitarSticker,
      isStarter: false,
      debutEpisode: 260,
    },
  ],
  6: [
    {
      name: 'treecko',
      img: TreeckoSticker,
      isStarter: true,
      debutEpisode: 283,
    },
    {
      name: 'torchic',
      img: TorchicSticker,
      isStarter: true,
      debutEpisode: 277,
    },
    { name: 'mudkip', img: MudkipSticker, isStarter: true, debutEpisode: 301 },
  ],
  7: [
    {
      name: 'grovyle',
      img: GrovyleSticker,
      isStarter: true,
      debutEpisode: 342,
    },
    {
      name: 'swellow',
      img: SwellowSticker,
      isStarter: false,
      debutEpisode: 356,
    },
    {
      name: 'torkoal',
      img: TorkoalSticker,
      isStarter: false,
      debutEpisode: 334,
    },
  ],
  8: [
    {
      name: 'corphish',
      img: CorphishSticker,
      isStarter: false,
      debutEpisode: 369,
    },
    {
      name: 'snorunt',
      img: SnoruntSticker,
      isStarter: true,
      debutEpisode: 384,
    },
    { name: 'glalie', img: GlalieSticker, isStarter: false, debutEpisode: 386 },
  ],
  9: [
    {
      name: 'sceptile',
      img: SceptileSticker,
      isStarter: true,
      debutEpisode: 426,
    },
    {
      name: 'charizard',
      img: CharizardS9Sticker,
      isStarter: true,
      debutEpisode: 422,
    },
    {
      name: 'snorlax',
      img: SnorlaxS9Sticker,
      isStarter: false,
      debutEpisode: 428,
    },
  ],
  10: [
    {
      name: 'turtwig',
      img: TurtwigSticker,
      isStarter: true,
      debutEpisode: 471,
    },
    {
      name: 'chimchar',
      img: ChimcharSticker,
      isStarter: true,
      debutEpisode: 468,
    },
    { name: 'piplup', img: PiplupSticker, isStarter: true, debutEpisode: 468 },
  ],
  11: [
    { name: 'buizel', img: BuizelSticker, isStarter: false, debutEpisode: 507 },
    {
      name: 'monferno',
      img: MonfernoSticker,
      isStarter: true,
      debutEpisode: 562,
    },
    { name: 'grotle', img: GrotleSticker, isStarter: true, debutEpisode: 567 },
  ],
  12: [
    {
      name: 'infernape',
      img: InfernapeSticker,
      isStarter: true,
      debutEpisode: 631,
    },
    {
      name: 'gliscor',
      img: GliscorSticker,
      isStarter: false,
      debutEpisode: 531,
    },
    { name: 'gible', img: GibleSticker, isStarter: false, debutEpisode: 625 },
  ],
  13: [
    {
      name: 'torterra',
      img: TorterraSticker,
      isStarter: true,
      debutEpisode: 634,
    },
    {
      name: 'staraptor',
      img: StaraptorSticker,
      isStarter: false,
      debutEpisode: 585,
    },
    {
      name: 'infernape',
      img: InfernapeSticker13,
      isStarter: true,
      debutEpisode: 631,
    },
  ],
  14: [
    { name: 'snivy', img: SnivySticker, isStarter: true, debutEpisode: 661 },
    { name: 'tepig', img: TepigSticker, isStarter: true, debutEpisode: 663 },
    {
      name: 'oshawott',
      img: OshawottSticker,
      isStarter: true,
      debutEpisode: 660,
    },
  ],
  15: [
    {
      name: 'pignite',
      img: PigniteSticker,
      isStarter: true,
      debutEpisode: 739,
    },
    {
      name: 'krookodile',
      img: KrookodileSticker,
      isStarter: false,
      debutEpisode: 751,
    },
    {
      name: 'leavanny',
      img: LeavannySticker,
      isStarter: false,
      debutEpisode: 733,
    },
  ],
  16: [
    {
      name: 'oshawott',
      img: OshawottSticker16,
      isStarter: true,
      debutEpisode: 723,
    },
    { name: 'snivy', img: SnivySticker16, isStarter: true, debutEpisode: 724 },
    {
      name: 'unfezant',
      img: UnfezantSticker,
      isStarter: false,
      debutEpisode: 727,
    },
  ],
  17: [
    {
      name: 'chespin',
      img: ChespinSticker,
      isStarter: true,
      debutEpisode: 804,
    },
    {
      name: 'fennekin',
      img: FennekinSticker,
      isStarter: true,
      debutEpisode: 804,
    },
    {
      name: 'froakie',
      img: FroakieSticker,
      isStarter: true,
      debutEpisode: 804,
    },
  ],
  18: [
    {
      name: 'frogadier',
      img: FrogadierSticker,
      isStarter: true,
      debutEpisode: 855,
    },
    {
      name: 'talonflame',
      img: TalonflameSticker,
      isStarter: false,
      debutEpisode: 889,
    },
    {
      name: 'hawlucha',
      img: HawluchaSticker,
      isStarter: false,
      debutEpisode: 838,
    },
  ],
  19: [
    {
      name: 'greninja',
      img: GreninjaSticker,
      isStarter: true,
      debutEpisode: 903,
    },
    {
      name: 'noivern',
      img: NoivernSticker,
      isStarter: false,
      debutEpisode: 913,
    },
    { name: 'goodra', img: GoodraSticker, isStarter: false, debutEpisode: 873 },
  ],
  20: [
    {
      name: 'popplio',
      img: PopplioSticker,
      isStarter: true,
      debutEpisode: 942,
    },
    { name: 'litten', img: LittenSticker, isStarter: true, debutEpisode: 942 },
    { name: 'rowlet', img: RowletSticker, isStarter: true, debutEpisode: 945 },
  ],
  21: [
    {
      name: 'lycanroc',
      img: LycanrocSticker,
      isStarter: false,
      debutEpisode: 978,
    },
    {
      name: 'torracat',
      img: TorracatSticker,
      isStarter: true,
      debutEpisode: 1004,
    },
    {
      name: 'rowlet',
      img: RowletSticker21,
      isStarter: true,
      debutEpisode: 963,
    },
  ],
  22: [
    {
      name: 'incineroar',
      img: IncineroarSticker,
      isStarter: true,
      debutEpisode: 1083,
    },
    {
      name: 'melmetal',
      img: MelmetalSticker,
      isStarter: false,
      debutEpisode: 1076,
    },
    {
      name: 'lycanroc',
      img: LycanrocSticker22,
      isStarter: false,
      debutEpisode: 1008,
    },
  ],
  23: [
    {
      name: 'dragonite',
      img: DragoniteSticker,
      isStarter: false,
      debutEpisode: 1099,
    },
    {
      name: 'gengar',
      img: GengarSticker,
      isStarter: false,
      debutEpisode: 1105,
    },
    {
      name: 'lucario',
      img: LucarioSticker,
      isStarter: false,
      debutEpisode: 1134,
    },
  ],
  24: [
    {
      name: 'dracovish',
      img: DracovishSticker,
      isStarter: false,
      debutEpisode: 1139,
    },
    {
      name: 'sirfetchd',
      img: SirfetchdSticker,
      isStarter: false,
      debutEpisode: 1149,
    },
    {
      name: 'lucario',
      img: LucarioSticker24,
      isStarter: false,
      debutEpisode: 1134,
    },
  ],
  25: [
    {
      name: 'dracovish',
      img: DracovishSticker25,
      isStarter: false,
      debutEpisode: 1139,
    },
    {
      name: 'lucario',
      img: LucarioSticker25,
      isStarter: false,
      debutEpisode: 1134,
    },
    {
      name: 'pikachu',
      img: PikachuSticker25,
      isStarter: false,
      debutEpisode: 1136,
    },
  ],
  26: [
    {
      name: 'sprigatito',
      img: SprigatitoSticker,
      isStarter: true,
      debutEpisode: 1233,
    },
    {
      name: 'fuecoco',
      img: FuecocoSticker,
      isStarter: true,
      debutEpisode: 1233,
    },
    { name: 'quaxly', img: QuaxlySticker, isStarter: true, debutEpisode: 1233 },
  ],
  27: [
    {
      name: 'quaxwell',
      img: QuaxwellSticker,
      isStarter: true,
      debutEpisode: 1275,
    },
    {
      name: 'floragato',
      img: FloragatoSticker,
      isStarter: true,
      debutEpisode: 1276,
    },
    {
      name: 'terapagos',
      img: TerapagosSticker,
      isStarter: false,
      debutEpisode: 1274,
    },
  ],
};
