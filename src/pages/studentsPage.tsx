import * as React from 'react';
import { NavBar } from '../components/navbar/navbar';
import { StudentsTable } from '../components/studentsTable/studentsTable';

export const StudentsPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <br />
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <StudentsTable />
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  );
};
