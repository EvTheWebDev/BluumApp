

export interface ColorPalette {
  background: string;
  text: string;
  inputBorder: string;
  button: string; 
  placeholder: string;
}

export const COLORS: Record<'light' | 'dark', ColorPalette> = {
  light: {
    text: '#11181C',
    background: '#fff',
  inputBorder: '#ccc',
  button: '#734DFF',
  placeholder: '#666666',
  },
  dark: {
    text: '#ffffffff',
    background: '#411393',
  inputBorder: '#555',
  button: '#734DFF',
  placeholder: '#666666',
  },
};