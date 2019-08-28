import DateFnsUtils from '@date-io/date-fns';
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, InputAdornment } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withFirebaseAuth } from '../../../contextProviders/FirebaseUser';

const initState = {
  name: '',
  gender: 'male',
  age: 0
};
const isDateValid = (date) => date instanceof Date && !isNaN(date)

function useFormController(user, setFormsCompleted, activeStep) {
  const [formInfo, setFormInfo] = useState(initState);
  useEffect(() => {
    setFormInfo((formInfo) => {
      return ({
        ...formInfo,
        name: user ? user.name : '',
      })
    })
  }, [user]);
  useEffect(() => {
    function calculateAge(birthday) {
      if (birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      return 0;
    }
    setFormInfo((formInfo) => {
      return ({
        ...formInfo,
        age: calculateAge(formInfo.dob),
      })
    })
  }, [formInfo.dob]);
  useEffect(() => {
    const { name, gender, dob, phoneNumber, city, locality, state, pincode, aboutMe } = formInfo;
    if (name && gender && dob && phoneNumber && city && locality && state && pincode && aboutMe) {
      console.log(formInfo);
      setFormsCompleted({ type: activeStep, isCompleted: true });
    } else {
      setFormsCompleted({ type: activeStep, isCompleted: false });
    }
  }, [formInfo]);
  function onChangeInput(event) {
    if (event.target.name === 'dob' && !isDateValid(event.target.value)) {
      event.target.value = '';
    }
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  }
  return [formInfo, onChangeInput];
}


function PersonalForm({ user, title, setFormsCompleted, activeStep }) {
  const [formInfo, onChangeInput] = useFormController(user, setFormsCompleted, activeStep);
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            margin="normal"
            label="Full Name"
            fullWidth
            autoComplete="name"
            value={formInfo.name}
            onChange={onChangeInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel component="legend" margin="normal">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            defaultValue={formInfo.gender}
            row
            margin="normal"
            onChange={onChangeInput}>
            <FormControlLabel value="male" control={<Radio />} label="Male" margin="normal"/>
            <FormControlLabel value="female" control={<Radio />} label="Female" margin="normal"/>
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="MM/dd/yyyy"
              fullWidth
              margin="normal"
              id="date-picker"
              name='dob'
              value={formInfo.dob}
              maxDate = {new Date()}
              label="Date Of Birth"
              onChange={(date) => onChangeInput({ target: { name: 'dob', value: date } })}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            type={"number"}
            name="age"
            fullWidth
            label="Age"
            autoComplete="age"
            value={formInfo.age}
            margin="normal"
            onChange={onChangeInput}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            margin="normal"
            fullWidth
            type={"number"}
            autoComplete="phone"
            onChange={onChangeInput}
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="otp"
            name="otp"
            label="Otp"
            margin="normal"
            fullWidth
            placeholder="xxxx"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            margin="normal"
            fullWidth
            autoComplete="city"
            placeholder="Chennai"
            onChange={onChangeInput}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="locality"
            name="locality"
            label="Locality"
            margin="normal"
            fullWidth
            autoComplete="locality"
            placeholder="Tambaram"
            onChange={onChangeInput}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State"
            margin="normal"
            fullWidth
            autoComplete="state"
            placeholder="Tamil Nadu"
            onChange={onChangeInput}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pincode"
            name="pincode"
            label="Pincode"
            margin="normal"
            fullWidth
            autoComplete="pincode"
            placeholder="600045"
            onChange={onChangeInput}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            margin="normal"
            rowsMax={5}
            rows={4}
            fullWidth
            multiline
            autoComplete="address"
            value={formInfo.address}
            placeholder="Full address"
            onChange={onChangeInput}/>
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
            value={formInfo.aboutMe}
            autoComplete="aboutMe"
            placeholder="I'm good at ...."
            onChange={onChangeInput}/>
        </Grid>
      </Grid>
    </Fragment>
  )
}


const Personal = compose(
  withFirebaseAuth
)(PersonalForm);
export default memo(Personal);