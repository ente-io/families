import { DialogContent, Button, Dialog, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AppContext } from '../pages/_app';
import { inviteMember } from '../services/APIService';
import theme from '../theme';
import constants from '../util/strings/constants';
import {
    CloseButtonContainer,
    ErrorContainer,
    ImageContainer,
    TextContainer,
} from './styledComponents/InviteDialog';
import InviteSent from './InviteSent';
import { logError } from '../util/sentry';

function InviteDialog({ open, setOpen }) {
    const { isLargerDisplay, authToken, syncMembers } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | JSX.Element>('');
    const [isInviteSent, setIsInviteSent] = useState(false);

    const handleInviteClick = async () => {
        try {
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
                syncMembers();
                setEmail('');
            } else {
                setIsError(true);
                setErrorMsg(res.msg);
            }
        } catch (e) {
            logError(e, 'failed to invite member');
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
                maxWidth="xs"
                PaperProps={{
                    style: {
                        borderRadius: 10,
                        background: '#000',
                    },
                }}>
                <div
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        width: '300px',
                    }}>
                    <DialogContent>
                        <CloseButtonContainer>
                            <IoMdClose
                                size={18}
                                onClick={() => setOpen(false)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </CloseButtonContainer>
                        <ImageContainer mq={isLargerDisplay}>
                            <div
                                style={{
                                    width: isLargerDisplay ? '80px' : '50px',
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
                            paddingTop: '4px',
                            paddingBottom: '20px',
                        }}>
                        <div
                            style={{
                                marginTop: '24px',
                                width: '85%',
                            }}>
                            <TextField
                                type={'email'}
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
                                autoComplete="off"
                                sx={{
                                    input: {
                                        backgroundColor: '#e4e4e4',
                                        fontSize: '16px',
                                        color: isError
                                            ? theme.palette.error.main
                                            : '#000',
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                        </div>
                        {isError && (
                            <ErrorContainer
                                style={{ color: theme.palette.error.main }}>
                                {errorMsg}
                            </ErrorContainer>
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
                                width: isLargerDisplay ? '50%' : '60%',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}>
                            {constants.INVITE}
                        </Button>
                        <TextContainer>
                            {constants.INVITE_MEMBER_DIALOG_COPY}
                        </TextContainer>
                    </div>
                </div>
            </Dialog>
            <InviteSent open={isInviteSent} setOpen={setIsInviteSent} />
        </>
    );
}

export default InviteDialog;
