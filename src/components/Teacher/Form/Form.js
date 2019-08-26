import React, { Fragment, useState, useReducer } from "react";
import { compose } from "recompose";
import { withFirebaseAuth } from "../../../contextProviders/FirebaseUser";
import AppBar from '../../Headers';
import { CssBaseline, Paper, Typography, Stepper, Step, StepLabel, useMediaQuery, Hidden } from "@material-ui/core";
import Footer from "../../Footer";
import useEffects from './Effects';
import { TEACHER } from '../../../constants/Constants';
import FormController from "./FormController";
import FormContent from "./FormContent";


const Title = () => (
  <Typography component="h1" variant="h4" align="center">
    {TEACHER.FORM.TITLE}
  </Typography>)

const StepperComponent = React.memo(({ activeStep, className }) => {
  const isComputer = useMediaQuery('(min-width:650px)');
  return (
    <Stepper activeStep={activeStep} className={className} alternativeLabel>
      {TEACHER.FORM.STEPS.map(label => (
        <Step key={label}>
          <StepLabel>{isComputer ? label : ''}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
})
function initForm(initFormState = initialFormState) {
  return initFormState;
}
function reducer(state, action) {
  switch (action.type) {
    case 0:
      return { ...state, form1: action.isCompleted };
    case 1:
      return { ...state, form2: action.isCompleted };
    case 2:
      return { ...state, form3: action.isCompleted };
    case 3:
      return { ...state, form4: action.isCompleted };
    default:
      return initForm();
  }
}
const initialFormState = { form1: false, form2: false, form3: false, form4: false };
function FormBase({ user }) {
  const classes = useEffects();
  const [activeStep, setActiveStep] = useState(0);
  const [formsCompleted, setFormsCompleted] = useReducer(reducer, initialFormState, initForm);

  return (<Fragment>
    <CssBaseline />
    <AppBar />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Title />
        <StepperComponent activeStep={activeStep} className={classes.stepper} />
        <Fragment>
          <FormContent activeStep={activeStep} titles={TEACHER.FORM.STEPS_TITLE} formInfo={{ setFormsCompleted, formsCompleted }} />
          <FormController controller={{ setActiveStep, activeStep }} className={classes} steps={TEACHER.FORM.STEPS} formsCompleted={formsCompleted} />
        </Fragment>
      </Paper>
    </main>
    <Footer />
  </Fragment>)
}

const Form = compose(
  withFirebaseAuth
)(FormBase);

export default Form;