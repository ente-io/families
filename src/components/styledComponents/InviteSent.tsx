import { styled } from '@mui/material';

export const ImageContainer = styled('div')<{ mq: boolean; }>(({ mq }) => ({
    marginRight: mq ? '48px' : '48px',
    marginLeft: mq ? '48px' : '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
}));
