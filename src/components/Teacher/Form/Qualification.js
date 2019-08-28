import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, List, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { compose } from 'recompose';
import { withFirebaseAuth } from '../../../contextProviders/FirebaseUser';


const initState = {
  degreeStatus: 'completed',
  university: '',
  completion: '',
  language: [{  //TODO: old school format langue need to refactored 
    name: 'English',
    ability: ['write'] 
  }],
};
const languageOptions = ['Speak', 'Write', 'Speak and Write'];
function useFormController(setFormsCompleted, activeStep) {
  const [formInfo, setFormInfo] = useState(initState);
  useEffect(() => {
    const { university, degreeStatus, completion, languages, aboutMe } = formInfo;
    if (university && degreeStatus && completion && languages && aboutMe) {
      setFormsCompleted({ type: activeStep, isCompleted: true });
    } else {
      setFormsCompleted({ type: activeStep, isCompleted: false });
    }
  }, [formInfo]);
  function onChangeInput(event) {
    if (event.target.name.startsWith('language')) {
      const index = event.target.name.split('::')[1];
      const lang = formInfo.language;
      const rest = lang[index];
      lang[index] = { ...rest, name: event.target.value };
      setFormInfo({ ...formInfo, language: lang });
      console.log(formInfo.language);
      return;
    }
    console.log(event.target.name, event.target.name.startsWith('ability'), event.currentTarget.getAttribute('name'));
    if (event.currentTarget.getAttribute('name').startsWith('ability')) {
      const index = event.target.name.split('::')[1];
      const lang = formInfo.language;
      const rest = lang[index];
      let ability = rest ? (rest.ability || []) : [];
      if (ability.includes(event.target.value)) {
        ability = ability.filter((ele) => ele != event.target.value);
      } else {
        ability.push(event.target.value);
      }
      lang[index] = { ...rest, ability };
      setFormInfo({ ...formInfo, language: lang });
      console.log(formInfo.language);
      return;
    }
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  }
  function addNewLanguage() {
    console.log(formInfo);
    setFormInfo({
      ...formInfo, language: formInfo.language.push({
        name: '',
        ability: [],
      })
    });
  }
  return [formInfo, onChangeInput, addNewLanguage];
}

//TODO: LanguageComponent is not working as expected so it has be changed 
const LanguageComponent = ({ index, onChangeInput, formInfo }) =>
  <>
    <FormLabel component="legend" margin="normal">Languages Knwon</FormLabel>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="language"
          name={`language::${index}`}
          placeholder='English'
          margin="normal"
          label="Language"
          value={formInfo.language[index].name}
          onChange={onChangeInput} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormGroup aria-label="position" name={`ability::${index}`} onChange={onChangeInput} row>
          <FormControlLabel
            control={
              <Checkbox
                value="write"
                checked={formInfo.language[index].ability.includes('write')}
                color="primary"
              />
            }
            labelPlacement="top"
            label="Write"
            name={`write::${index}`}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="read"
                color="primary"
                checked={formInfo.language[index].ability.includes('read')}
              />
            }
            labelPlacement="top"
            label="Read"
            name={`read::${index}`}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Speak"
                color="primary"
                checked={formInfo.language[index].ability.includes('speak')}
              />
            }
            labelPlacement="top"
            label="Speak"
            name={`speak::${index}`}
          />
        </FormGroup>
      </Grid>
    </Grid>
  </>

function QualificationForm({ title, setFormsCompleted, activeStep }) {
  const [formInfo, onChangeInput, addNewLanguage] = useFormController(setFormsCompleted, activeStep);
  const [numOfLanguage, addNumOfLan] = useState(1);
  const [languageComponent, addLanguageListComponent] = useState([]);
  useEffect(() => {
    let component = [];
    addNewLanguage();
    for (let i = 0; i < numOfLanguage; i++) {
      component.push(<List key={i}><LanguageComponent index={i} onChangeInput={onChangeInput} formInfo={formInfo} /></List>)
    }
    addLanguageListComponent(component);
  }, [numOfLanguage]);

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
            onChange={onChangeInput} />
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend">Degree Status</FormLabel>
          <RadioGroup
            aria-label="degreeStatus"
            name="degreeStatus"
            defaultValue={formInfo.degreeStatus}
            margin="normal"
            onChange={onChangeInput}>
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
            label="Completion Year"
            value={formInfo.completion}
            margin="normal"
            onChange={onChangeInput} />
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
            onChange={onChangeInput} />
        </Grid>
        <Grid item xs={12}>
          {languageComponent}
          <Button color="primary" margin="normal" onClick={() => addNumOfLan(numOfLanguage + 1)}>Add Language</Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}


const Qualification = compose(
  withFirebaseAuth
)(QualificationForm);

export default memo(Qualification);