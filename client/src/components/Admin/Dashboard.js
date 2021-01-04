import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from "@material-ui/core/styles";
import { getHRDetails, logoutUser } from '../../actions/authActions';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(3),
  },
  appBar: {
    
  },
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
    position: 'relative',
    left: 430
    
  },
  check: {
    margin: "absolute",
    display:"flex",
  }
}));

export default function Dashboard() {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.auth);
  useEffect(() => {
      dispatch(getHRDetails());
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
              Welcome Admin
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <Grid container spacing={10}>
        <Grid item xs={12} lg={6}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => history.push("/add-hr")}
          >
            Add HR
          </Button>
        </Grid>
        <Grid className={classes.check} item xs={12} lg={6}>
        <Button
            variant="contained"
            color="default"
            className={classes.logoutButton}
            startIcon={<ExitToAppIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">Skype Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.hrDetails.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.skypeId}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
