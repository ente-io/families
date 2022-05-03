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

export interface ActionDialogOptions {
    msg: string | JSX.Element;
    defaultText: string;
    warningText?: string;
    onDefaultClick: () => void;
    onWarningClick?: () => void;
    title: string;
}

export const defaultActionDialogOptions: ActionDialogOptions = {
    msg: '',
    defaultText: '',
    warningText: '',
    onDefaultClick: () => {},
    onWarningClick: () => {},
    title: '',
};

function ActionDialog({
    open,
    setOpen,
    options,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    options: ActionDialogOptions;
}) {
    const { isSmallerDisplay } = useContext(AppContext);

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
                            flexDirection: isSmallerDisplay ? 'row' : 'column',
                            alignItems: isSmallerDisplay ? 'auto' : 'center',
                            justifyContent: 'flex-end',
                        }}>
                        {options.warningText && (
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={options.onWarningClick}
                                style={{
                                    marginRight: isSmallerDisplay
                                        ? '20px'
                                        : '0px',
                                    textTransform: 'none',
                                    width: isSmallerDisplay ? 'auto' : '90%',
                                    marginBottom: isSmallerDisplay
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
                                width: isSmallerDisplay ? 'auto' : '90%',
                                marginRight: isSmallerDisplay ? '24px' : '0px',
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
