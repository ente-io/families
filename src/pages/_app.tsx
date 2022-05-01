import { GlobalStyles } from '@mui/material';
import React from 'react';

function App({ Component, pageProps }) {
    return (
        <>
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
        </>
    );
}

export default App;
