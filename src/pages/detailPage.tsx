import * as React from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/navbar/navbar';
import { StudentsData } from '../interfaces/interfaces';
import Moment from 'react-moment';

export const DetailPage: React.FC = () => {
  const { id }: any = useParams();
  const [student, setStudent] = React.useState<StudentsData | null>(null);

  const getStudent = async () => {
    const baseURL: string = `https://students-devtest.herokuapp.com/api/students/detail/${id}`;

    const resp = await fetch(baseURL);
    const student = await resp.json();

    setStudent(student);
  };

  React.useEffect(() => {
    getStudent();
  }, []);

  return (
    <div className='row'>
      <NavBar />

      <div className='col-4'></div>

      <div className='col-4'>
        <br />
        <div>FirstName: {student?.firstName}</div>
        <br />
        <div>LastName: {student?.lastName}</div>
        <br />
        <div>
          Date of birth: {<Moment format='YYYY/MM/DD'>{student?.dob}</Moment>}
        </div>
        <br />
        <div>Email: {student?.email}</div>
        <br />
        <div>Address:{student?.address}</div>
        <br />
        <div>Gender:{student?.gender === 'm' ? 'Male' : 'Female'}</div>
      </div>
      <div className='col-4'></div>
    </div>
  );
};
