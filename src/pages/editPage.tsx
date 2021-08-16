import * as React from 'react';
import { NavBar } from '../components/navbar/navbar';
import { useParams } from 'react-router-dom';

import DatePicker from 'react-date-picker';

import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import Swal from 'sweetalert2';

export const EditPage: React.FC = () => {
  const baseURL: string = `https://students-devtest.herokuapp.com/api/students/`;

  const { id: idStudent }: any = useParams();

  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    dob: new Date(),
    email: '',
    address: '',
    gender: '',
    id: '',
  });

  const [valueDatePicker, setChangeDatePicker] = React.useState(new Date());
  const [valueGender, setValueGender] = React.useState('f');
  const getStudent = () => {
    fetch(`${baseURL}detail/${idStudent}`).then((res) => {
      res.json().then((data) => {
        setFormValues({ ...data });
        setChangeDatePicker(new Date(data.dob));
        setValueGender(data.gender);
      });
    });
  };

  React.useEffect(() => {
    getStudent();
  }, []);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleChangeDob = (event: any) => {
    setChangeDatePicker(event);
    setFormValues({
      ...formValues,
      dob: event,
    });
  };

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueGender((event.target as HTMLInputElement).value);
    setFormValues({
      ...formValues,
      gender: event.target.value,
    });
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    };

    const resp = await fetch(`${baseURL}edit/${id}`, requestOptions);

    if (resp.status === 200) {
      Swal.fire('Student has been edited');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  const { firstName, lastName, email, address, id } = formValues;

  return (
    <div>
      <NavBar />
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <h1>Edit Student</h1>
          <form onSubmit={handleSubmitForm}>
            <div className='mb-3'>
              <label className='form-label'>First Name</label>
              <input
                type='text'
                className='form-control'
                autoComplete='off'
                name='firstName'
                value={firstName}
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input
                type='text'
                className='form-control'
                autoComplete='off'
                name='lastName'
                value={lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>DOB </label>
              <DatePicker
                onChange={handleChangeDob}
                value={valueDatePicker}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                autoComplete='off'
                name='email'
                value={email}
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Address</label>
              <input
                type='text'
                className='form-control'
                autoComplete='off'
                name='address'
                value={address}
                onChange={handleInputChange}
              />
            </div>
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={valueGender}
              onChange={handleChangeGender}
            >
              <FormControlLabel value='f' control={<Radio />} label='Female' />
              <FormControlLabel value='m' control={<Radio />} label='Male' />
            </RadioGroup>
            {/* <button
              type='button'
              className='btn btn-danger'
              onClick={() => resetForm()}
            >
              Cancel
            </button> */}
            &nbsp;
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </form>
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  );
};
