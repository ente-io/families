import { createTheme, Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        primary: Palette['primary'];
        lightgray: Palette['secondary'];
        warning: Palette['secondary'];
        error: Palette['secondary'];
    }

    interface PaletteOptions {
        primary?: PaletteOptions['primary'];
        lightgray: PaletteOptions['primary'];
        warning?: PaletteOptions['primary'];
        error?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        primary: { main: '#1DB954', contrastText: '#fff' },
        lightgray: { main: '#6A6A6A' },
        warning: { main: '#fff', contrastText: '#ff6565' },
        error: { main: '#f06868' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: '#c2c2c2',
                        color: '#fff',
                    },
                },
            },
        },
    },
});

export default theme;
