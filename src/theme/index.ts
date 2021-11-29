import { createTheme, Theme, ThemeOptions } from '@mui/material';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import green from '@mui/material/colors/green';
import { Palette, PaletteColor } from '@mui/material/styles/createPalette';

interface IPalette extends Palette {
  danger: PaletteColor;
  success: PaletteColor;
}

export interface ITheme extends Theme {
  palette: IPalette;
}

interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    danger: {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    success: {
      light: green[300],
      main: green[500],
      dark: green[700]
    }
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '8px 16px'
      },
      text: {
        padding: '8px 16px'
      },
      outlined: {
        padding: '8px 16px'
      }
    }
  }
} as unknown as IThemeOptions);
