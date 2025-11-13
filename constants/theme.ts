export interface ColorPalette {
  background: string;
  text: string;
  inputBorder: string;
  button: string; 
  placeholder: string;
}


export const Colors = {
  // Brand Colors
  primaryGreen: '#4CAF50',
  primaryPurple: '#5A3E9B',
  accentOrange: '#FFC107',

  // Task Card Colors
  taskNursing: '#5A3E9B', // Same as primaryPurple
  taskNutritionBreakfast: '#FFB3BA',
  taskNutritionLunch: '#FFE082',
  taskNutritionDinner: '#A5D6A7',
  taskLeisureBlue: '#81D4FA',
  taskLeisurePink: '#F8BBD0',
  taskLeisurePurple: '#D1C4E9',
  taskLeisureTeal: '#B2DFDB',
  taskLeisureIndigo: '#C5CAE9',

  // Neutral & UI Colors
  white: '#FFFFFF',
  cardBackground: '#FFFFFF',
  screenBackground: '#E0F2F1',
  placeholder: '#CCCCCC',
  
  // Text Colors
  textPrimary: '#333333',
  textSecondary: '#666666',
};

// OLD COLORS FROM DARK AND LIGHT THEME SETUP

// export const COLORS: Record<'light' | 'dark', ColorPalette> = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//   inputBorder: '#ccc',
//   button: '#734DFF',
//   placeholder: '#666666',
//   },
//   dark: {
//     text: '#ffffffff',
//     background: '#411393',
//   inputBorder: '#555',
//   button: '#734DFF',
//   placeholder: '#666666',
//   },
// };