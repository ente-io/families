import { DialogActions, Button, Dialog, styled } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    marginRight: mq ? '48px' : '48px',
    marginLeft: mq ? '48px' : '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
}));

function InviteSent({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { isSmallerDisplay } = useContext(AppContext);

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
                <ImageContainer mq={isSmallerDisplay}>
                    <div
                        style={{
                            width: isSmallerDisplay ? '300px' : '300px',
                            maxWidth: '100%',
                            objectFit: 'contain',
                        }}>
                        <img
                            src="images/success.png"
                            height={'100%'}
                            width={'100%'}></img>
                    </div>
                    <div>Invite sent</div>
                </ImageContainer>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        style={{
                            textTransform: 'none',
                        }}>
                        ok
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default InviteSent;
