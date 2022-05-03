import { GlobalStyles, ThemeProvider } from '@mui/material';
import '../styles/global.css';
import React from 'react';
import theme from '../theme';

function App({ Component, pageProps }) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        body: {
                            backgroundColor: '#212121',
                            color: '#fff',
                            fontFamily: 'Inter',
                        },
                    }}
                />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default App;
