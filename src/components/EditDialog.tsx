import {
    DialogContent,
    Button,
    Dialog,
    TextField,
    DialogContentText,
    CircularProgress,
} from '@mui/material';
import { MdCheck, MdOutlineError } from 'react-icons/md';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AppContext } from '../pages/_app';
import { modifyMemberStorage } from '../services/APIService';
import theme from '../theme';
import {
    CloseButtonContainer,
    ErrorContainer,
} from './styledComponents/InviteDialog';
import { logError } from '../util/sentry';
import { convertGBsToBytes } from '../util/common';

function EditDialog({
    open,
    setOpen,
    memberID,
    prevLimit,
    memberUsage,
    onStorageUpdated,
}) {
    const { isLargerDisplay, authToken } = useContext(AppContext);
    const [storageLimit, setStorageLimit] = useState<number | null>(
        prevLimit ? null : prevLimit
    );
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | JSX.Element>('');
    const [status, setStatus] = useState<
        'normal' | 'loading' | 'success' | 'error'
    >('normal');

    // [!FOR THE FUTURE]
    // useLayoutEffect here is a dependency because handleStorageLimitChange sets the storageLimit
    // to the entered limitValue, and then the value of TextField uses the same value. Hence,
    // when the user is changed, the TextBox keeps on showing stale values. useLayoutEffect
    // is speciically used to avoid visual changes happening.
    useLayoutEffect(() => {
        setStorageLimit(prevLimit ?? null);
        setIsError(false);
        setErrorMsg('');
        setStatus('normal');
    }, [prevLimit]);

    const handleEditClick = async () => {
        setStatus('loading');
        try {
            const res = await modifyMemberStorage(
                authToken,
                memberID,
                convertGBsToBytes(storageLimit)
            );
            if (res.success) {
                setStatus('success');
                setTimeout(() => {
                    setOpen(false);
                    setStatus('normal');
                }, 500);
                setTimeout(() => {
                    if (onStorageUpdated) {
                        onStorageUpdated(memberID, storageLimit);
                    }
                }, 1000);
            } else {
                setStatus('error');
                setIsError(true);
                setErrorMsg(res.msg);
            }
        } catch (e) {
            logError(e, 'failed to modify storage');
            setIsError(true);
        }
    };

    // separate api call to setup null (unlimited) storage for member
    const handleResetStorage = async () => {
        try {
            // null sets no limit for the member
            const res = await modifyMemberStorage(authToken, memberID, null);
            if (res.success) {
                setOpen(false);
                setStorageLimit(null);
                if (onStorageUpdated) {
                    onStorageUpdated(memberID, storageLimit);
                }
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
        setStatus('normal');
        let limitValue = Number(event.target.value);
        if (limitValue !== 0 && limitValue !== null && limitValue < memberUsage) {
            setIsError(true);
            setErrorMsg(`Cannot reduce. Used storage is ${memberUsage}GB`);
            setStorageLimit(null);
            return;
        } else {
            setStorageLimit(limitValue);
            setIsError(false);
            setErrorMsg('');
            setStatus('normal');
            return;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditClick();
        }
    };

    const handleOnClose = async () => {
        if (isError === true) {
            setStorageLimit(null);
            setStatus('normal');
            setIsError(false);
            setOpen(false);
        } else {
            setStorageLimit(null);
            setStatus('normal');
            setOpen(false);
        }
    };

    // render button stylesheet as per the status from request
    const renderButtonStatus = () => {
        switch (status) {
            case 'loading':
                return <CircularProgress size={24} color="inherit" />;
            case 'success':
                return <MdCheck size={24} />;
            case 'error':
                return <MdOutlineError size={24} />;
            case 'normal':
                return 'Set limit';
            default:
                return 'Set limit';
        }
    };

    const renderRemoveLimit = () => {
        if (prevLimit != null) {
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
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs">
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
                                value={storageLimit === null ? '' : storageLimit || ''}
                                inputProps={{
                                    pattern: '^[0-9]+(\.[0-9]*)?$',
                                    step: "any",
                                }}
                                InputProps={{
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
                                placeholder="Enter limit"
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
                            backgroundColor: isError
                                ? theme.palette.error.main
                                : theme.palette.primary.main,
                            pointerEvents: isError ? 'none' : 'auto',
                        }}>
                        {renderButtonStatus()}
                    </Button>
                </div>
            </Dialog>
        </>
    );
}

export default EditDialog;
