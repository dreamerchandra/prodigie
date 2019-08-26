import React from 'react';
import Personal from './Personal';
import Qualification from './Qualification';

function getStepContent(step, titles, formInfo) {
  switch (step) {
    case 0:
      return <Personal title={titles[step]} setFormsCompleted={formInfo.setFormsCompleted} activeStep={step}/>;
    case 1:
      return <Qualification title={titles[step]} setFormsCompleted={formInfo.setFormsCompleted} ctiveStep={step}/>;
    // case 2:
    //   return <Review />;
    // default:
    //   throw new Error('Unknown step');
  }
}
function FormContent({ activeStep, titles, formInfo }) {
  return getStepContent(activeStep, titles, formInfo);
}

export default FormContent;