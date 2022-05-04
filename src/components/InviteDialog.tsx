import {
    DialogContent,
    Button,
    Dialog,
    styled,
    TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AppContext } from '../pages/_app';
import { inviteMember } from '../services/APIService';
import theme from '../theme';
import constants from '../util/strings/constants';
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
    const { isSmallerDisplay, authToken, setShouldSyncMembers } =
        useContext(AppContext);
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | JSX.Element>('');
    const [isInviteSent, setIsInviteSent] = useState(false);

    const handleInviteClick = async () => {
        if (email.length === 0) {
            return;
        }

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            setIsError(true);
            setErrorMsg(constants.ENTER_VALID_EMAIL);
            return;
        }

        const res = await inviteMember(authToken, email);
        if (res.success) {
            setOpen(false);
            setIsInviteSent(true);
            setShouldSyncMembers(true);
            setEmail('');
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleInviteClick();
        }
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
                        width: isSmallerDisplay ? '400px' : '300px',
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
                        <ImageContainer mq={isSmallerDisplay}>
                            <div
                                style={{
                                    width: isSmallerDisplay ? '80px' : '50px',
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
                                autoFocus={true}
                                inputProps={{
                                    style: { textTransform: 'none' },
                                    autoCapitalize: 'none',
                                }}
                                onChange={handleTextChange}
                                onKeyDown={handleKeyPress}
                                sx={{
                                    input: {
                                        backgroundColor: '#e4e4e4',
                                        fontSize: '16px',
                                        color: isError
                                            ? theme.palette.error.main
                                            : '#000',
                                    },
                                }}
                            />
                        </div>
                        {isError && (
                            <div
                                style={{
                                    color: theme.palette.error.main,
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
                                width: isSmallerDisplay ? '50%' : '60%',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}>
                            {constants.INVITE}
                        </Button>
                        <TextContainer>{constants.PRIVATE_SPACE}</TextContainer>
                        <TextContainer>
                            {constants.DATA_NOT_SHARED}
                        </TextContainer>
                    </div>
                </div>
            </Dialog>
            <InviteSent open={isInviteSent} setOpen={setIsInviteSent} />
        </>
    );
}

export default InviteDialog;
