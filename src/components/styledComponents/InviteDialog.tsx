import { styled } from '@mui/material';

export const ImageContainer = styled('div')<{ mq: boolean; }>(({ mq }) => ({
    marginRight: mq ? '52px' : '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '-16px',
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
