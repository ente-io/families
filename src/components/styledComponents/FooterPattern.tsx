import { styled } from '@mui/system';

export const RelativePosContainer = styled('div')(() => ({
    position: 'relative',
}));

export const FadedOverlay = styled('div')(() => ({
    position: 'absolute',
    background:
        'linear-gradient(\
                    to bottom,\
                    rgba(33, 33, 33, 0.72) 8.6%,\
                    rgba(33, 33, 33, 0) 158.51%\
                )',
    zIndex: 1,
    top: '0',
    bottom: '0',
    width: '100%',
}));
