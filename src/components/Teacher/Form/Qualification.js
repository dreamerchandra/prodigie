import React, { Fragment, memo, Component, useState, useEffect } from 'react';
import { Typography, Grid, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, TextareaAutosize } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'recompose';
import { withFirebaseAuth } from '../../../contextProviders/FirebaseUser';

const state = {
  university: '',
  degreeStatus: 'completed',
  completion: 0,
  languages: {},
  aboutMe: '',
};

function QualificationForm({ title, setFormsCompleted, activeStep }) {
  const [formInfo, setFormInfo] = useState(state);

  useEffect(() => {
    const { university, degreeStatus, completion, languages, aboutMe } = formInfo;
    if (university && degreeStatus && completion && languages && aboutMe) {
      setFormsCompleted({ type: activeStep, isCompleted: true });
    } else {
      setFormsCompleted({ type: activeStep, isCompleted: false });
    }
  }, [formInfo]);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="university"
            name="university"
            margin="normal"
            label="University/College"
            fullWidth
            autoComplete="university"
            value={formInfo.university}
            onChange={(event) => setFormInfo({ ...formInfo, university: event.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Degree Status</FormLabel>
          <RadioGroup
            aria-label="degreeStatus"
            name="degreeStatus"
            defaultValue={formInfo.degreeStatus}
            row
            margin="normal"
            onChange={(event) => setFormInfo({ ...formInfo, degreeStatus: event.target.value })}>
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
            <FormControlLabel value="pursuing" control={<Radio />} label="Currently Pursuing" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="completion"
            type={"number"}
            name="completion"
            fullWidth
            label="Completion Year"
            value={formInfo.completion}
            margin="normal"
            onChange={(event) => setFormInfo({ ...formInfo, age: event.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="aboutMe"
            name="aboutMe"
            label="About Me"
            margin="normal"
            rowsMax={5}
            rows={4}
            fullWidth
            multiline
            autoComplete="aboutMe"
            placeholder="I'm good at ...."
            value={formInfo.aboutMe}
            onChange={(event) => setFormInfo({ ...formInfo, aboutMe: event.target.value })}
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}


const Qualification = compose(
  withFirebaseAuth
)(QualificationForm);

export default memo(Qualification);