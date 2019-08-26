import { Button } from "@material-ui/core";
import React from "react";

function FormController({ controller: { setActiveStep, activeStep }, className: classes, steps, formsCompleted }) {
  const isFormsCompleted = Object.values(formsCompleted);
  if (activeStep !== steps.length) {
    return (
      <div className={classes.buttons}>
        {activeStep !== 0 && (
          <Button onClick={() => setActiveStep(activeStep - 1)} className={classes.button} disabled={!isFormsCompleted[activeStep]}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setActiveStep(activeStep + 1)}
          className={classes.button}
          disabled = {!isFormsCompleted[activeStep]}
        >
          {activeStep === steps.length - 1 ? 'Conform' : 'Next'}
        </Button>
      </div>
    )
  }
  return (<></>)
}

export default FormController