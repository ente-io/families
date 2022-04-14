import { createTheme, Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        primary: Palette['primary'];
        lightgray: Palette['secondary'];
    }

    interface PaletteOptions {
        primary?: PaletteOptions['primary'];
        lightgray: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        primary: { main: '#1DB954', contrastText: '#fff' },
        lightgray: { main: '#6A6A6A' },
    },
});

export default theme;
