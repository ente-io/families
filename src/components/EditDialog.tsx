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
import { Unstable_NumberInput as NumberInput } from '@mui/base';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

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
                        padding: '10px',
                        width: 'auto',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <DialogContent
                        style={{
                            backgroundColor: 'white',
                        }}>
                        <CloseButtonContainer>
                            <IoMdClose
                                size={18}
                                onClick={() => setOpen(false)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </CloseButtonContainer>
                        <DialogContentText
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#000',
                                textAlign: 'center',
                            }}>
                            Edit Storage
                        </DialogContentText>
                    </DialogContent>
                    <div
                        style={{
                            padding: '10px',
                        }}>
                        <TextField
                            type="number"
                            InputProps={{ inputProps: { shiftMultiplier: 0 } }}
                            placeholder="storage in GB, ex: 10GB"
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
                                    backgroundColor: '#e4e4e4',
                                    fontSize: '16px',
                                    color: isError
                                        ? theme.palette.error.main
                                        : '#000',
                                    borderRadius: '8px',
                                    padding: 'none'
                                },
                            }}
                        />
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#9f9f9f',
                            }}>
                            Default (empty) means sets no storage limit
                        </p>
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
                        onClick={handleEditClick}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            width: isLargerDisplay ? '50%' : '60%',
                            marginTop: '25px',
                            marginBottom: '30px',
                            margin: 'auto',
                        }}>
                        Save
                    </Button>
                </div>
            </Dialog>
        </>
    );
}

export default EditDialog;