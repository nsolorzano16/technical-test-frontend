import * as React from 'react';
import { StudentsData } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import DatePicker from 'react-date-picker';

import moment from 'moment';

export const EditForm = ({
  firstName,
  lastName,
  dob,
  email,
  address,
  gender,
  id,
}: StudentsData) => {
  const [formState, setFormState] = React.useState({
    firstName,
    lastName,
    dob,
    email,
    address,
    gender,
    id,
  });

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <form>
        <div className='mb-3'>
          <label className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            autoComplete='off'
            name='firstName'
            value={formState.firstName}
            onChange={handleInputChange}
            required={true}
          />
        </div>
      </form>
    </div>
  );
};
