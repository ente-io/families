import { GlobalStyles } from '@mui/material';
import React from 'react';

function App({ Component, pageProps }) {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css?family=Inter:400,700"
                rel="stylesheet"
            />

            <GlobalStyles
                styles={{
                    body: {
                        backgroundColor: '#121212',
                        color: '#fff',
                        fontFamily: 'Inter',
                    },
                }}
            />
            <Component {...pageProps} />
        </>
    );
}

export default App;
