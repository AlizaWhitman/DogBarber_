import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as actions from "../actions/client";
import { useToasts } from "react-toast-notifications";
import useForm from "./Form";
import { connect } from "react-redux";

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
        width: '100%', // Fix IE 11 issue.
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

const SignUp = ({ ...props }) => {

    const { addToast } = useToasts()

    const validation = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
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
                addToast("Registered Successfully, Welcome " + JSON.parse(localStorage.getItem("CurrentClient")).userName, { appearance: 'success' })
                window.location.replace("/queue");
            }
            const onFailure = () => {
                addToast("Sorry, but we have encountered an issue while registering you in. Please try again later. Thank you!", { appearance: 'failure' })
            }
            props.create(values, onSuccess, onFailure);
        }
    }

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={values.firstName}
                                onChange={handleInputChange}
                                {...(errors.firstName && { error: true, helperText: errors.firstName })}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="userName"
                                value={values.userName}
                                onChange={handleInputChange}
                                {...(errors.userName && { error: true, helperText: errors.userName })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up</Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
})

const mapActionToProps = {
    post: actions.create
}

export default connect(mapStateToProps, mapActionToProps)(SignUp);

