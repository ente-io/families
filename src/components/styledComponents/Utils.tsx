import { styled } from '@mui/system';

export const CenteredContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
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
