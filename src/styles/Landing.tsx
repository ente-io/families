import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
    marginBottom: mq ? '16px' : '0px',
}));
export const GetStartedButton = styled(Button)<{ mq: boolean }>(({ mq }) => ({
    width: mq ? '50%' : '300px',
    maxWidth: '100%',
    fontSize: '20px',
    textTransform: 'none',
    marginBottom: '32px',
}));
export const ContentContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    fontSize: mq ? '32px' : '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-end' : 'center',
    marginLeft: '20px',
    marginRight: mq ? '32px' : '16px',
    marginTop: mq ? '48px' : '16px',
}));
