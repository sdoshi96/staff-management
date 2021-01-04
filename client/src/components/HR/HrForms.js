import React, { useState } from "react";
import { useHistory } from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerEmpUser } from "../../actions/authActions";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
  }));

  
export default function Forms(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [skypeId, setSkypeId] = useState('');
    const history = useHistory();
    const users = useSelector((state) => state.auth);

    const submitForm = e => {
      e.preventDefault()
      const newEmpUser = {
        name,
        username,
        email,
        password,
        mobile,
        skypeId
      }
      const id = users.user.user._id;
      dispatch(registerEmpUser(id, newEmpUser, history));
    }
  
    return(
        <>
        <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
        Employee Details
      </Typography>
      <form className={classes.form} noValidate onSubmit={submitForm}>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            value = {name}
            onChange= {e => setName(e.target.value)}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            value={username}
            onChange= {e => setUsername(e.target.value)}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange= {e => setEmail(e.target.value)}
            fullWidth
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange= {e => setPassword(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="skypeId"
            name="skypeId"
            label="skypeId"
            value={skypeId}
            onChange= {e => setSkypeId(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile Number"
            value={mobile}
            onChange= {e => setMobile(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      </form>
        </Paper>
        </main>
        </>
    );

}