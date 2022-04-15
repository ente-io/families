import {
    DialogContent,
    DialogContentText,
    Button,
    Dialog,
    DialogTitle,
} from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages';
import { IoMdClose } from 'react-icons/io';

function ActionDialog({
    msg,
    open,
    setOpen,
    options,
}: {
    msg: string | JSX.Element;
    open: boolean;
    setOpen: (open: boolean) => void;
    options: {
        confirmText: string;
        warningText?: string;
        onConfirmClick: () => void;
        onWarningClick?: () => void;
        title: string;
    };
}) {
    const { mediaQuery } = useContext(AppContext);

    const handleClose = (e, reason) => {
        if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
            return;
        }
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs">
            <div
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                }}>
                <DialogTitle>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        {options.title}
                        <IoMdClose
                            onClick={() => setOpen(false)}
                            style={{
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{
                            color: 'white',
                        }}>
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <div
                    style={{
                        marginBottom: '8px',
                        width: '100%',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: mediaQuery ? 'row' : 'column',
                            alignItems: mediaQuery ? 'auto' : 'center',
                            justifyContent: 'flex-end',
                        }}>
                        {options.warningText && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={options.onWarningClick}
                                style={{
                                    marginRight: mediaQuery ? '20px' : '0px',
                                    textTransform: 'none',
                                    width: mediaQuery ? 'auto' : '90%',
                                    marginBottom: mediaQuery ? '0px' : '12px',
                                }}>
                                {options.warningText}
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={options.onConfirmClick}
                            style={{
                                textTransform: 'none',
                                width: mediaQuery ? 'auto' : '90%',
                                marginRight: mediaQuery ? '24px' : '0px',
                            }}>
                            {options.confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default ActionDialog;
