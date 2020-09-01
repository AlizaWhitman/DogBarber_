import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/queue";
import DeleteIcon from "@material-ui/icons/Delete";

const initialFieldValues = {
    Id: '',
    ClientId: '',
    AppointmentHour: '',
    BookingHour: ''
}


const DeleteApp = ({ classes, ...props }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDelete = id => {
        handleClose();
        props.deleteApp(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }

    const { addToast } = useToasts()

    return (
        <div>
            <Button><DeleteIcon color="secondary" onClick={handleClickOpen} /></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this appointment"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"> After deleting there will be no way to retrieve the information </DialogContentText></DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Disagree</Button>
                    <Button onClick={() => onDelete(props.record.id)} color="primary" autoFocus> Agree </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
})

const mapActionToProps = {
    deleteApp: actions.Delete,
}

export default connect(mapStateToProps, mapActionToProps)(DeleteApp);