import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/queue";
import { Table, Grid, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, TableSortLabel, Link, Input } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import Typography from '@material-ui/core/Typography';
import useForm from "./Form";
import { TextField } from "@material-ui/core";
import PutApp from "./PutApp";
import PostApp from "./PostApp";
import DeleteApp from "./DeleteApp";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppDetails from "./AppDetails";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    tableCell: {
        padding: theme.spacing(5)
    }
})

const Queue = ({ classes, ...props }) => {

    const [currentId, setCurrentId] = useState(0)

    const [userNameToFilter, setUserNameToFilter] = useState()

    const [dateToFilter, setDateToFilter] = useState()

    const { addToast } = useToasts()

    useEffect(() => {
        props.getQueue()
        setUserNameToFilter(" ")
        setDateToFilter("")
    }, [])

    const filterByUserName = (event, value, reason) => {
        setUserNameToFilter(value)
    }

    const filterByAppHour = (event, value, reason) => {
        setDateToFilter(value)
    }

    //Hash map: const userNames = new Set(props.queue.map((app) => app.userName))

    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography align='center' variant="h3" gutterBottom> Appointment List </Typography>
            <Grid container justify='center' alignItems='center' alignContent='center' align='center'>
                <Grid item align='center'>
                    <TableContainer align='center' className={classes.root}>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell className={classes.tableCell}>
                                        <Typography variant="h5" gutterBottom> Client User Name</Typography>
                                        <Autocomplete
                                            freeSolo
                                            disableClearable
                                            options={props.queue.map((app) => app.userName)}
                                            renderInput={(params) => (
                                                <div>
                                                    <TextField
                                                        {...params}
                                                        label="Filter by User Name "
                                                        margin="normal"
                                                        variant="outlined"
                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                    />
                                                </div>
                                            )}
                                            onInputChange={filterByUserName}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        <Typography variant="h5" gutterBottom>Appointment Hour </Typography>
                                        <Autocomplete
                                            freeSolo
                                            disableClearable
                                            options={props.queue.map((app) => app.appointmentHour)}
                                            renderInput={(params) => (
                                                <div>
                                                    <TextField
                                                        {...params}
                                                        label="Filter by date"
                                                        margin="normal"
                                                        variant="outlined"
                                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                                    />
                                                </div>
                                            )}
                                            onInputChange={filterByAppHour}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <PostApp />
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.queue.map((record, index) => {
                                        if (record.userName.includes(userNameToFilter) && record.appointmentHour.includes(dateToFilter))
                                            return (
                                                <TableRow key={index} hover >
                                                    <TableCell className={classes.tableCell}>
                                                        {record.userName}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        {record.appointmentHour}
                                                    </TableCell>
                                                    <AppDetails{...({ record })} />
                                                    {function () {
                                                        if (JSON.parse(localStorage.getItem("CurrentClient")).id == record.clientId) {
                                                            return (
                                                                <TableCell>
                                                                    <ButtonGroup variant="text">
                                                                        <DeleteApp {...({ record })} />
                                                                        <PutApp {...({ currentId, setCurrentId, record })} />
                                                                    </ButtonGroup>
                                                                </TableCell>
                                                            )
                                                        }
                                                    }.call(this)}
                                                </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper >
    );
}

const mapStateToProps = state => ({
    queue: state.queue.list
})

const mapActionToProps = {
    getQueue: actions.getQueue,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Queue));
