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
import { modifyMemberStorage } from '../services/APIService';
import theme from '../theme';
import {
    CloseButtonContainer,
    ErrorContainer,
} from './styledComponents/InviteDialog';
import { logError } from '../util/sentry';

function EditDialog({ open, setOpen, memberID, prevLimit, memberUsage }) {
    const { isLargerDisplay, authToken } = useContext(AppContext);
    const [storageLimit, setStorageLimit] = useState<number>(null);
    const [isError, setIsError] = useState(false);
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

    const handleResetStorage = async () => {
        try {
            // 0 sets no limit for the member
            const res = await modifyMemberStorage(authToken, memberID, 0);
            if (res.success) {
                setOpen(false);
                setStorageLimit(null);
            } else {
                setIsError(true);
                setErrorMsg(res.msg);
            }
        } catch (e) {
            logError(e, 'failed to reset storage');
            setIsError(true);
        }
    };

    const handleStorageLimitChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const limitValue = Number(event.target.value);
        if (limitValue < memberUsage) {
            setIsError(true);
            setErrorMsg(`Cannot reduce. Used storage is ${memberUsage}GB`);
            setStorageLimit(null);
        } else {
            setStorageLimit(limitValue);
            setIsError(false);
            setErrorMsg('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditClick();
        }
    };

    const handleOnClose = () => {
        if (isError === true) {
            setStorageLimit(null);
            setIsError(false);
            setOpen(false);
        } else {
            setOpen(false);
            setStorageLimit(null);
        }
    };

    const renderRemoveLimit = () => {
        // if prevLimit != 0 then render the remove limit button
        if (prevLimit != 0) {
            return (
                <Button
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
                    Remove limit
                </Button>
            );
        }
    };

    return (
        <>
            <Dialog open={open} maxWidth="xs">
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
                                onClick={handleOnClose}
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
                            Set storage limit
                        </DialogContentText>
                    </DialogContent>
                    <div
                        style={{
                            width: 'parent',
                            paddingBottom: '20px',
                            paddingRight: '10px',
                            paddingLeft: '10px',
                            marginBottom: '10px',
                        }}>
                        <div>
                            <TextField
                                type="number"
                                InputProps={{
                                    inputProps: {
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
                                placeholder={
                                    // if there was a limit set show the pre-set limit
                                    // else just show "Enter Limit" for the user to set a limit
                                    prevLimit != 0
                                        ? `Current limit: ${Math.max(
                                              memberUsage,
                                              prevLimit
                                          )} GB`
                                        : ' Enter limit'
                                }
                                onChange={handleStorageLimitChange}
                                onKeyDown={handleKeyPress}
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
                            {isError && (
                                <ErrorContainer
                                    style={{ color: theme.palette.error.main }}>
                                    {errorMsg}
                                </ErrorContainer>
                            )}
                        </div>
                    </div>
                    {renderRemoveLimit()}
                    <Button
                        disabled={isError}
                        variant="contained"
                        color="primary"
                        onClick={handleEditClick}
                        sx={{
                            textTransform: 'none',
                            fontSize: '16px',
                            width: isLargerDisplay ? '95%' : '60%',
                            marginTop: '25px',
                            marginBottom: '30px',
                            margin: 'auto',
                        }}>
                        Set limit
                    </Button>
                </div>
            </Dialog>
        </>
    );
}

export default EditDialog;
