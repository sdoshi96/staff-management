import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { getEmpProfileDetails, logoutUser } from '../../actions/authActions';

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
  logoutButton: {
    margin: theme.spacing(1),
    position: "relative",
    left: 430,
  },
  avatarParent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));


export default function EmpDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth);
  useEffect(() => {
    const id = users.user.user._id
    dispatch(getEmpProfileDetails(id));
});

  const onLogout = e => {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <Container className={classes.header} component="main" maxwidth="lg">
      <div className={classes.appBar}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Welcome Employee
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <Grid container spacing={10}>
        <Grid className={classes.avatarParent} item xs={12} lg={6}>
          <Avatar className={classes.avatar}>
            {" "}
            <Typography variant="h1">H</Typography>
          </Avatar>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <Typography variant="h3">{users.profileDetails.name}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <Typography variant="h3">{users.profileDetails.username}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <Typography variant="h3">{users.profileDetails.email}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <Typography variant="h3">{users.profileDetails.skypeId}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <Typography variant="h3">{users.profileDetails.mobile}</Typography>
                  </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
      <Button
            variant="contained"
            color="default"
            className={classes.logoutButton}
            startIcon={<ExitToAppIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
    </Container>
  );
}
