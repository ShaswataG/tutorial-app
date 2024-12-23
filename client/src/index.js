import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './styles/home/about.css';
import './styles/home/courses/courses.css';
import './styles/home/courses/course-container.css';
import './styles/home/courses/course-card.css';
import './styles/registerForm.css';
import './styles/loginForm.css';
import './styles/dashboard/dashboard.css';
import './styles/courseDetails/courseDetails.css';
import './styles/blogEditor/blogEditor.css';
import './styles/blog/blog.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
