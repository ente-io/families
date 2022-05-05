import { styled } from '@mui/material';

export const ImageContainer = styled('div')<{ mq: boolean; }>(({ mq }) => ({
    marginLeft: mq ? '16px' : '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
    marginTop: mq ? '0px' : '24px',
}));
