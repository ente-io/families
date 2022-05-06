import {
    DialogContent,
    DialogContentText,
    Button,
    Dialog,
    DialogTitle,
} from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../pages/_app';
import { IoMdClose } from 'react-icons/io';
import { ActionDialogOptions } from '../types';

function ActionDialog({
    open,
    setOpen,
    options,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    options: ActionDialogOptions;
}) {
    const { isLargerDisplay } = useContext(AppContext);

    const handleClose = (_, reason) => {
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
                        {options.msg}
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
                            flexDirection: isLargerDisplay ? 'row' : 'column',
                            alignItems: isLargerDisplay ? 'auto' : 'center',
                            justifyContent: 'flex-end',
                        }}>
                        {options.warningText && (
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={options.onWarningClick}
                                style={{
                                    marginRight: isLargerDisplay
                                        ? '20px'
                                        : '0px',
                                    textTransform: 'none',
                                    width: isLargerDisplay ? 'auto' : '90%',
                                    marginBottom: isLargerDisplay
                                        ? '0px'
                                        : '12px',
                                }}>
                                {options.warningText}
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={options.onDefaultClick}
                            style={{
                                textTransform: 'none',
                                width: isLargerDisplay ? 'auto' : '90%',
                                marginRight: isLargerDisplay ? '24px' : '0px',
                            }}>
                            {options.defaultText}
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default ActionDialog;
