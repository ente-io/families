import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import { LogoImage } from '../styles/Navbar';

function Navbar() {
    const { isSmallerDisplay } = useContext(AppContext);

    return (
        <>
            {isSmallerDisplay && (
                <Container
                    maxWidth={'xl'}
                    sx={{
                        textAlign: isSmallerDisplay ? 'start' : 'center',
                    }}>
                    <div
                        style={{
                            marginLeft: isSmallerDisplay ? '2vw' : '0vw',
                        }}>
                        <LogoImage alt="logo" src="./icon.svg" />
                    </div>
                </Container>
            )}
        </>
    );
}

export default Navbar;
