import { GlobalStyles, ThemeProvider } from '@mui/material';
import '../styles/global.css';
import React from 'react';
import theme from '../theme';
import Head from 'next/head';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Family</title>
            </Head>
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
