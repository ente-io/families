import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import { LogoImage } from './styledComponents/Navbar';

function Navbar() {
    const { isLargerDisplay } = useContext(AppContext);

    return (
        <>
            {isLargerDisplay && (
                <Container
                    maxWidth={'xl'}
                    sx={{
                        textAlign: isLargerDisplay ? 'start' : 'center',
                    }}>
                    <div
                        style={{
                            marginLeft: isLargerDisplay ? '2vw' : '0vw',
                        }}>
                        <LogoImage alt="logo" src="./icon.svg" />
                    </div>
                </Container>
            )}
        </>
    );
}

export default Navbar;
