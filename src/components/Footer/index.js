import React, { Fragment } from 'react';
import { Link, Typography } from '@material-ui/core';

function Copyright() {
  return (
    <Fragment>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Prodigie
      </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Fragment>
  );
}
export default React.memo(Copyright)