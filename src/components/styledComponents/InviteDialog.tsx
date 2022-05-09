import { styled } from '@mui/material';

export const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    marginRight: mq ? '52px' : '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '-16px',
}));

export const CloseButtonContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '-14px',
    marginTop: '-8px',
}));

export const TextContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '2px',
    marginBottom: '2px',
    color: '#9f9f9f',
    fontSize: '12px',
    width: '90%',
}));

export const ErrorContainer = styled('div')(() => ({
    fontWeight: 500,
    fontSize: '12px',
    marginTop: '10px',
    width: '90%',
    textAlign: 'center',
}));
