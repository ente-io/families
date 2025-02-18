import {
    DialogContent,
    Button,
    Dialog,
    TextField,
    DialogContentText,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AppContext } from '../pages/_app';
import { getMembers, modifyMemberStorage } from '../services/APIService';
import theme from '../theme';
import {
    CloseButtonContainer,
    ErrorContainer,
} from './styledComponents/InviteDialog';
import { logError } from '../util/sentry';

function EditDialog({ open, setOpen, memberID }) {
    const { isLargerDisplay, authToken } = useContext(AppContext);
    const [storageLimit, setStorageLimit] = useState<number>(null);
    const [isError, setIsError] = useState(false);
    const [memID, setMemID] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | JSX.Element>('');

    const handleEditClick = async () => {
        try {
            const res = await modifyMemberStorage(
                authToken,
                memberID,
                storageLimit
            );
            if (res.success) {
                setOpen(false);
                setStorageLimit(null);
            } else {
                setIsError(true);
                setErrorMsg(res.msg);
            }
        } catch (e) {
            logError(e, 'failed to modify storage');
            setIsError(true);
        }
    };

    const handleStorageLimitChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMemID(memberID);
        // Convert GB to Bytes before sending data to the server
        const value = Number(event.target.value);
        setStorageLimit(value);
        setIsError(false);
        setErrorMsg('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditClick();
        }
    };

    const handleResetStorage = () => {
        setStorageLimit(0);
        setOpen(false);
    };

    const renderRemoveLimit = () => {
        if (storageLimit) {
            return (
                <Button
                    disabled={isError}
                    variant="contained"
                    onClick={handleResetStorage}
                    sx={{
                        textTransform: 'none',
                        fontSize: '16px',
                        color: 'black',
                        backgroundColor: '#f5f5f5',
                        ':hover': {
                            backgroundColor: '#e4e4e4',
                        },
                        width: isLargerDisplay ? '95%' : '60%',
                        margin: 'auto',
                        marginBottom: '15px',
                        dropShadow: 'none',
                    }}>
                    Remove Limit
                </Button>
            );
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
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px 10px',
                    }}>
                    <DialogContent
                        style={{
                            padding: '10px 15px',
                        }}>
                        <CloseButtonContainer>
                            <IoMdClose
                                size={18}
                                onClick={() => setOpen(false)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '50%',
                                }}
                            />
                        </CloseButtonContainer>
                        <DialogContentText
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#000',
                                padding: 'none',
                            }}>
                            Set Storage limit
                        </DialogContentText>
                    </DialogContent>
                    <div
                        style={{
                            width: 'parent',
                            padding: '10px 10px',
                            marginBottom: '10px',
                        }}>
                        <div>
                            <TextField
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        style: { paddingRight: '10px' },
                                    },
                                    endAdornment: (
                                        <span
                                            style={{
                                                right: '-10%',
                                                color: '#949494',
                                            }}>
                                            GB
                                        </span>
                                    ),
                                }}
                                placeholder="10"
                                onChange={handleStorageLimitChange}
                                onKeyDown={handleKeyPress}
                                value={storageLimit}
                                error={isError}
                                size="small"
                                variant="filled"
                                fullWidth={true}
                                autoFocus={true}
                                autoComplete="off"
                                sx={{
                                    input: {
                                        fontSize: '16px',
                                        color: isError
                                            ? theme.palette.error.main
                                            : '#000',
                                        borderRadius: '8px',
                                        padding: '10px',
                                    },
                                }}
                            />
                        </div>
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#9f9f9f',
                            }}></p>
                    </div>
                    {isError && (
                        <ErrorContainer
                            style={{ color: theme.palette.error.main }}>
                            {errorMsg}
                        </ErrorContainer>
                    )}
                    {renderRemoveLimit()}
                    <Button
                        disabled={isError}
                        variant="contained"
                        color="primary"
                        onClick={handleEditClick}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            width: isLargerDisplay ? '95%' : '60%',
                            marginTop: '25px',
                            marginBottom: '30px',
                            margin: 'auto',
                        }}>
                        Set Limit
                    </Button>
                </div>
            </Dialog>
        </>
    );
}

export default EditDialog;
