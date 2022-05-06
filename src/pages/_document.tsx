import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function App() {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/images/ente-512.png" type="image/png" />
                <link
                    rel="apple-touch-icon"
                    href="/images/apple-touch-icon.png"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
