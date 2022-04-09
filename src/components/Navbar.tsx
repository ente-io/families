import { Container } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const LogoImage = styled('img')({
    height: '24px',
    marginTop: '15px',
    padding: '5px',
});

function Navbar({ mediaQuery }: { mediaQuery: boolean }) {
    return (
        <Container
            maxWidth={'xl'}
            sx={{
                textAlign: mediaQuery ? 'start' : 'center',
            }}>
            <div
                style={{
                    marginLeft: mediaQuery ? '2vw' : '0vw',
                }}>
                <LogoImage alt="logo" src="./icon.svg" />
            </div>
        </Container>
    );
}

export default Navbar;
