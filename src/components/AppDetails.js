
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ZoomInIcon from "@material-ui/icons/ZoomIn";

const AppDetails = ({ classes, ...props }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button><ZoomInIcon color="action" onClick={handleClickOpen} /></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Appointment Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clients User Name: {props.record.userName}.
                        Clients Id: {props.record.clientId}.
                        Appointment Hour:
                        <TextField
                            type="datetime-local"
                            value={props.record.bookingHour}
                            disabled="true"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />.
                        Booking Hour:
                        <TextField
                            type="datetime-local"
                            value={props.record.appointmentHour}
                            disabled="true"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Ok </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(AppDetails);