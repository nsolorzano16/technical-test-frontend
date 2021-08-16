import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { DetailPage } from '../pages/detailPage';
import { EditPage } from '../pages/editPage';
import { HomePage } from '../pages/homePage';
import { StudentsPage } from '../pages/studentsPage';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/students' component={StudentsPage} />
          <Route exact path='/detail/:id' component={DetailPage} />
          <Route exact path='/edit/:id' component={EditPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
};
