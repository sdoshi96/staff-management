import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(3),
  },
  appBar: {},
  table: {
    minWidth: 650,
  },
  button: {
    display: "flex",
    margin: theme.spacing(1),
    alignItems: "flex-end",
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  avatar: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom:100
  },
}));


export default function LandingPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.header} component="main" maxwidth="lg">
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Staff Management System
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <Grid container spacing={10}>
        <Grid className={classes.section} item xs={12} lg={4}>
        <Avatar className={classes.avatar}>
            {" "}
            <Typography variant="h4">Admin</Typography>
          </Avatar>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={() => history.push("/admin-login")}
          >
            Admin Login
          </Button>
        </Grid>
        <Grid className={classes.section} item xs={12} lg={4}>
        <Avatar className={classes.avatar}>
            {" "}
            <Typography variant="h4">HR</Typography>
          </Avatar>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={() => history.push("/hr-login")}
          >
            HR Login
          </Button>
        </Grid>
        <Grid className={classes.section} item xs={12} lg={4}>
        <Avatar className={classes.avatar}>
            {" "}
            <Typography variant="h4">Employee</Typography>
          </Avatar>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={() => history.push("/emp-login")}
          >
            Employee Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
