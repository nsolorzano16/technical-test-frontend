import * as React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RespDelete, StudentsData } from '../../interfaces/interfaces';

const baseURL: string = 'https://students-devtest.herokuapp.com/api/students';

export const StudentsTable: React.FC = () => {
  const [studentsList, setSudentsList] = React.useState([]);
  const [respDelete, setrespDelete] = React.useState<RespDelete | null>(null);

  const getStudentsData = async () => {
    const resp = await fetch(baseURL);
    const { students } = await resp.json();
    setSudentsList(students);
  };

  const deleteStudent = async (id: string) => {
    const resp = await fetch(`${baseURL}/delete/${id}`, { method: 'DELETE' });
    const data = await resp.json();
    setrespDelete(data);
  };

  function handleEdit() {
    console.log('HANDLE EDIT');
  }

  function handleDelete(id: string) {
    console.log('HANDLE DELETE', id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id);
        Swal.fire('Deleted!', respDelete?.msg, 'success');
        getStudentsData();
      }
    });
  }

  React.useEffect(() => {
    getStudentsData();
  }, [respDelete]);

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Student Name</th>
          <th scope='col'>Edit</th>
          <th scope='col'>Delete</th>
          <th scope='col'>Details</th>
        </tr>
      </thead>
      <tbody>
        {studentsList.map((student: StudentsData, index: number) => (
          <tr key={student.id}>
            <th scope='row'>{index + 1}</th>
            <td>{student.firstName}</td>
            <td>
              <Link to={`edit/${student.id}`}>
                <button type='button' className='btn btn-link'>
                  <i className='fas fa-edit'></i>
                </button>
              </Link>
            </td>
            <td>
              <button
                type='button'
                className='btn btn-link'
                onClick={() => handleDelete(student.id)}
              >
                <i className='far fa-trash-alt'></i>
              </button>
            </td>
            <td>
              <Link to={`detail/${student.id}`}>
                <button type='button' className='btn btn-link'>
                  <i className='fas fa-info'></i>
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
