import {
    DialogContent,
    Button,
    Dialog,
    styled,
    TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AppContext } from '../pages';
import { inviteMember } from '../services/APIService';
import customTheme from '../theme';
import InviteSent from './InviteSent';

const ImageContainer = styled('div')<{ mq: boolean }>(({ mq }) => ({
    marginRight: mq ? '52px' : '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '-16px',
}));

const TextContainer = styled('div')(() => ({
    marginTop: '2px',
    marginBottom: '2px',
    color: '#9f9f9f',
    fontSize: '12px',
}));

function InviteDialog({ open, setOpen }) {
    const { mediaQuery, authToken, setShouldSyncMembers } =
        useContext(AppContext);
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | JSX.Element>('');
    const [isInviteSent, setIsInviteSent] = useState(false);

    const handleInviteClick = async () => {
        if (email.length === 0) {
            return;
        }
        const res = await inviteMember(authToken, email);
        if (res.success) {
            setOpen(false);
            setIsInviteSent(true);
            setShouldSyncMembers(true);
        } else {
            setIsError(true);
            setErrorMsg(res.msg);
        }
    };

    const handleTextChange = (e) => {
        setEmail(e.target.value);
        setIsError(false);
        setErrorMsg('');
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                maxWidth="xs">
                <div
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: mediaQuery ? '400px' : '300px',
                    }}>
                    <DialogContent>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                            <IoMdClose
                                onClick={() => setOpen(false)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                        <ImageContainer mq={mediaQuery}>
                            <div
                                style={{
                                    width: mediaQuery ? '80px' : '50px',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                }}>
                                <img
                                    src="images/family_add_single.png"
                                    height={'100%'}
                                    width={'100%'}></img>
                            </div>
                        </ImageContainer>
                    </DialogContent>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: '#fff',
                            color: '#000',
                            paddingBottom: '20px',
                        }}>
                        <div
                            style={{
                                marginTop: '24px',
                                width: '90%',
                            }}>
                            <TextField
                                error={isError}
                                hiddenLabel
                                placeholder="member@family.com"
                                size="small"
                                variant="filled"
                                fullWidth={true}
                                value={email}
                                onChange={handleTextChange}
                                sx={{
                                    input: {
                                        backgroundColor: '#e4e4e4',
                                        fontSize: '16px',
                                        color: isError
                                            ? customTheme.palette.error.main
                                            : '#000',
                                    },
                                }}
                            />
                        </div>
                        {isError && (
                            <div
                                style={{
                                    color: customTheme.palette.error.main,
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    marginTop: '10px',
                                    width: '90%',
                                    textAlign: 'center',
                                }}>
                                {errorMsg}
                            </div>
                        )}
                        <Button
                            disabled={isError}
                            variant="contained"
                            color="primary"
                            onClick={handleInviteClick}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                width: mediaQuery ? '50%' : '60%',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}>
                            Invite
                        </Button>
                        <TextContainer>
                            Private space will be allocated
                        </TextContainer>
                        <TextContainer>
                            Your data will not be shared
                        </TextContainer>
                    </div>
                </div>
            </Dialog>
            <InviteSent open={isInviteSent} setOpen={setIsInviteSent} />
        </>
    );
}

export default InviteDialog;
