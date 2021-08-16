import * as React from 'react';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link active' to='/'>
                Add Student
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active' to='/students'>
                Students List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
