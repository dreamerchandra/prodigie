import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { compose } from 'recompose';
import { withFirebaseAuth } from '../../contextProviders/FirebaseUser';
import SignIn from '../SignIn';
import ProfileAvatar from './ProfileAvatar';
import useStyles from './useStyles';


function ButtonAppBarBase({ user }) {
  const classes = useStyles();
  const auth = Boolean(user);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap color="inherit">
            News
          </Typography>
          {!auth ? <SignIn /> : <ProfileAvatar user={user} classes={classes}/> }
        </Toolbar>
      </AppBar>
    </div>
  );
}


const ButtonAppBar = compose(
  withFirebaseAuth
)(React.memo(ButtonAppBarBase));

export default ButtonAppBar;