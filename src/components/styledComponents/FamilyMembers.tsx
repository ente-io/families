import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import PersonIcon from '../icons/PersonIcon';

export const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-start' : 'center',
    justifyContent: 'center',
}));
export const InviteButton = styled(Button)<{ mq: boolean }>(({ mq }) => ({
    width: mq ? '70%' : '250px',
    maxWidth: '100%',
    fontSize: '20px',
    textTransform: 'none',
    marginTop: mq ? '64px' : '0px',
    marginBottom: '32px',
}));
export const ContentContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    fontSize: mq ? '32px' : '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: mq ? 'flex-end' : 'flex-start',
    marginLeft: '20px',
    marginRight: mq ? '96px' : '16px',
    marginTop: mq ? '48px' : '16px',
}));

export const NoMembersInviteLine = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '18px',
    color: '#6C6C6C',
    marginTop: '40px',
    marginBottom: '32px',
}));

export const PersonIconContainer = ({
    fill,
    mq,
}: {
    fill?: string;
    mq: boolean;
}) => {
    return (
        <div
            style={{
                marginRight: mq ? '8px' : '4px',
            }}>
            <PersonIcon fill={fill ? fill : undefined} />
        </div>
    );
};
