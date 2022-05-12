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

                <link rel="preload" href="/images/add_family.png" as="image" />
                <link rel="preload" href="/images/ellipse.png" as="image" />
                <link
                    rel="preload"
                    href="/images/family_add_single.png"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/images/family_sharing.png"
                    as="image"
                />
                <link rel="preload" href="/images/success.png" as="image" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
