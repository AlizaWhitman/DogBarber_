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
import AddIcon from "@material-ui/icons/Add";
import useForm from "./Form";

const initialFieldValues = {
    id: '',
    clientId: parseInt(JSON.parse(localStorage.getItem("CurrentClient")).id),
    appointmentHour: ' ',
    bookingHour: '',
}

const PostApp = ({ classes, ...props }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        handleClose()
        if (validation()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' })
                resetForm()
            }
            props.postApp(values, onSuccess);
        }
    };

    const { addToast } = useToasts()

    const validation = (fieldValues = values) => {
        let temp = { ...errors }
        if ('appointmentHour' in fieldValues) {
            temp.appointmentHour = fieldValues.appointmentHour ? "" : "Please enter an hour so that we can book you an appointment."
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validation, props.setCurrentId)

    return (
        <div>
            <Button><AddIcon color="primary" onClick={handleClickOpen} /></Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Booking</DialogTitle>
                <DialogContent>
                    <DialogContentText> To book an appointment, please select a date and time </DialogContentText>
                    <TextField
                        name="appointmentHour"
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        value={values.appointmentHour}
                        onChange={handleInputChange}
                        {...(errors.appointmentHour && { error: true, helperText: errors.appointmentHour })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleSubmit} color="primary"> Book Appointment </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
})

const mapActionToProps = {
    postApp: actions.create,
}

export default connect(mapStateToProps, mapActionToProps)(PostApp);