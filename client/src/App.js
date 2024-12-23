import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import ProtectedRoute from './components/ProtectedRoute';
import BlogEditor from './pages/BlogEditor';
import Blog from './pages/Blog';
import InstructedCourses from './pages/InstructedCourses';
import CreateCourse from './pages/CreateCourse';
import AdminRoute from './components/AdminRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/> }>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route 
            path='/dashboard'>
            <Route 
              index 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path='/dashboard/instructedCourses' element={<InstructedCourses />}/>
            <Route path='/dashboard/instructedCourses/createCourse' element={<CreateCourse />} />
          </Route> 
          {/* <Route 
              path='/dashboard' 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
            } 
          /> */}
          <Route 
            path='/instructedCourses/:courseId/:sectionId/:position/addBlog'
            element={
              <AdminRoute>
                <BlogEditor />
              </AdminRoute>
            }
          />
          <Route 
            path='/dashboard/instructedCourses/:courseId/editCourse'
            element={
              <AdminRoute>
                <CreateCourse />
              </AdminRoute>
            }
          />
          <Route path='/courses/:id' element={<CourseDetails />} />
          <Route path='/courses/blogs/:id' element={<Blog />} />
        </Route>
        {/* <Route path="/courses" element={<Navbar/> }> */}
          {/* <Route path='/courses/:id' element={<CourseDetails />} /> */}
        {/* </Route> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
