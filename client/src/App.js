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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/> }>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard'>
            <Route 
              index 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path='/dashboard/instructedCourses' element={<InstructedCourses />}/>
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
              path='/editBlog'
              element={
                <ProtectedRoute>
                    <BlogEditor />
                </ProtectedRoute>
              }
          />
          <Route path='/courses/:id' element={<CourseDetails />} />
          <Route path='/courses/blogs/:id' element={<Blog />} />
        </Route>
        {/* <Route path="/courses" element={<Navbar/> }> */}
          {/* <Route path='/courses/:id' element={<CourseDetails />} /> */}
        {/* </Route> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
