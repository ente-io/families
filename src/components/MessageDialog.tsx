import {
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Dialog,
} from '@mui/material';
import React from 'react';

function MessageDialog({
    msg,
    open,
    setOpen,
}: {
    msg: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth={true}
            maxWidth="xs">
            <div
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                }}>
                <DialogContent>
                    <DialogContentText
                        style={{
                            color: 'white',
                        }}>
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default MessageDialog;
