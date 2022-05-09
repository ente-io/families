import { styled } from '@mui/system';

export const CenteredContainer = styled('div')(() => ({
    position: 'absolute',
    margin: 'auto',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
}));

export const OverlayContainer = styled('div')(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#212121',
    zIndex: 999,
}));
