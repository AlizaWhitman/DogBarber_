
import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText, colors, decomposeColor, Link } from "@material-ui/core";
import useForm from "./Form";
import { connect } from "react-redux";
import * as actions from "../actions/client";
import { useToasts } from "react-toast-notifications";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/alizawhitman/">
                Aliza Whitman linkedin
      </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initialFieldValues = {
    id: '',
    firstName: '',
    userName: '',
    password: ''
}

const SignIn = ({ ...props }) => {

    const { addToast } = useToasts()

    const validation = (fieldValues = values) => {
        let temp = { ...errors }
        if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const classes = useStyles();

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFieldValues, validation, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validation()) {
            const onSuccess = () => {
                addToast("Loged In Successfully, Welcome " + JSON.parse(localStorage.getItem("CurrentClient")).userName, { appearance: 'success' })
                window.location.replace("/queue");
            }
            const onFailure = () => {
                addToast("Sorry, but we have encountered an issue while connecting. Please make sure your details are correct, and if the problem continues please signup as a new client. Thank you", { appearance: 'failure' })
            }
            props.get(values, onSuccess, onFailure);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="UserName"
                        label="User Name"
                        name="userName"
                        value={values.userName}
                        onChange={handleInputChange}
                        {...(errors.userName && { error: true, helperText: errors.userName })}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleInputChange}
                        {...(errors.password && { error: true, helperText: errors.password })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Sign In </Button>
                    <Grid container>
                        <Grid item>
                            <a href="/signUp" >Don't have an account? Sign Up</a>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
})
const mapActionToProps = {
    get: actions.get
}

export default connect(mapStateToProps, mapActionToProps)(SignIn);