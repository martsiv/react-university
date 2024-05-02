import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import NoPage from './components/NoPage';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Courses from './components/Courses';
import CreateStudentForm from './components/Student';
import CreateCourseForm from './components/Course';
import CreateTeacherForm from './components/Teacher';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<Students />} />
          <Route path="students/create" element={<CreateStudentForm />} />
          <Route path="students/edit/:id" element={<CreateStudentForm />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/create" element={<CreateTeacherForm  />} />
          <Route path="teachers/edit/:id" element={<CreateTeacherForm />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/create" element={<CreateCourseForm />} />
          <Route path="courses/edit/:id" element={<CreateCourseForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;