import React, { useState, useEffect } from 'react';

const useFormController = (user) => {
  if (!user) user = {};
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState();
  const [age, setAge] = useState();
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [canProceed, setCanProceed] = useState(false);
  useEffect(() => {
    function calculateAge(birthday) {
      if (birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      return 0;
    }
    setAge((age) => calculateAge(dob));
  }, [dob]);
  useEffect(() => {
    console.log(name);
    if (name && gender && dob && phoneNumber && city && locality && state && pincode && aboutMe) {
      setCanProceed(true);
    }
  }, [name, gender, dob, phoneNumber, city, locality, state, pincode, aboutMe]);
  useEffect(() => {
    setName(user.name);
  }, [user]);
  return {
    formInfo: {
      name, setName, gender, setGender, dob, setDob, phoneNumber, setPhoneNumber, city, setCity, locality, setLocality,
      state, setState, address, setAddress, pincode, setPincode, aboutMe, setAboutMe,
    },
    canProceed
  }
}

export default useFormController;