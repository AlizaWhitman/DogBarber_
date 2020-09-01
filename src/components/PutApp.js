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
import EditIcon from "@material-ui/icons/Edit";
import useForm from "./Form";

const initialFieldValues = {
    id: '',
    clientId: parseInt(JSON.parse(localStorage.getItem("CurrentClient")).id),
    appointmentHour: ' ',
    bookingHour: '',
}

const PutApp = ({ classes, ...props }) => {
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
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validation, props.setCurrentId)


    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
        setValues({
            ...props.queue.find(x => x.id == props.record.id)
        })
        setErrors({})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rescheduleApp = () => {
        handleClose();
        if (validation()) {
            const onSuccess = () => {
                addToast("Submitted successfully", { appearance: 'success' })
                resetForm()
            }
            props.putApp(values.id, values, onSuccess);
        }
    }

    return (
        <div>
            <Button><EditIcon color="primary" onClick={handleClickOpen} /></Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Rescheduling</DialogTitle>
                <DialogContent>
                    <DialogContentText> To reschedule your appointment, please pick a time and date </DialogContentText>
                    <TextField
                        name="appointmentHour"
                        id="datetime-local"
                        label="Appointment hour"
                        type="datetime-local"
                        value={values.appointmentHour}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel</Button>
                    <Button onClick={rescheduleApp} color="primary"> Reschedule Appointment</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => ({
    queue: state.queue.list
})

const mapActionToProps = {
    putApp: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(PutApp);