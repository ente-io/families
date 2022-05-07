import { DialogActions, Button, Dialog } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import constants from '../util/strings/constants';
import { ImageContainer } from './styledComponents/InviteSent';

function InviteSent({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { isLargerDisplay } = useContext(AppContext);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="xs"
            onKeyDown={handleKeyDown}>
            <div
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                }}>
                <ImageContainer mq={isLargerDisplay}>
                    <div
                        style={{
                            height: 'calc(304px * min(300px, 100vw) / 300px)',
                            width: '300px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                        }}>
                        <img
                            src="images/success.png"
                            height={'100%'}
                            width={'100%'}></img>
                    </div>
                    <div>{constants.INVITE_SENT}</div>
                </ImageContainer>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        style={{
                            textTransform: 'none',
                        }}>
                        {constants.OK}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default InviteSent;
