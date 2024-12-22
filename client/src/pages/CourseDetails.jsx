import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import CourseLearningPoints from '../components/CourseDetails/CourseLearningPoints';
import CourseContent from '../components/CourseDetails/CourseContent/CourseContent';
import Button from '../components/CourseDetails/Button';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function CourseDetails() {

    const nagigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadFail, setLoadFail] = useState(false);

    const [isAdmin, setIsAdmin] = useState(null);

    const checkUserPrivileges = async(courseId) => {
        try {
            console.log('courseId: ', courseId);
            const response = await axios.get(`${baseUrl}/courses/admin/isAuth/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                }
            );
            console.log('response.data.isAdmin: ', response.data.isAdmin);
            if (response.data.isAdmin)
                setIsAdmin(true);
            else
                setIsAdmin(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchCourse() {
        try {
            const response = await axios.get(`${baseUrl}/courses/${id}`);
            console.log(response.data);
            setCourse(response.data);
            setLoading(false);
            setLoadFail(false);
            if (response.data.courseAdmins) {
                setAdmins(prevAdmins => {
                    return response.data.courseAdmins.map((admin, index) => {
                        // console.log(`admin ${index}: ${admin}`);
                        if (index < response.data.courseAdmins.length-1) {
                            return <span key={uuidv4()}>{admin}, </span>
                        } else {
                            return <span key={uuidv4()}>{admin}</span>
                        }
                    });
                });
            }
        } catch (error) {
            setLoading(false);
            setLoadFail(true);
        }
    }

    useEffect(() => {
        // console.log(`useEffect is running`);
        fetchCourse();
        checkUserPrivileges(id)
    }, [id]);

    // if (Object.keys(course)) return <h1>Loading...</h1>

    if (!loading && loadFail) 
        return (
            <section style={{ padding: "4rem" }}>
                <h1>Loading Failed</h1>
            </section>
        )
    else if (loading && !loadFail) 
        return (
            <section style={{ padding: "4rem" }}>
                <h1>Loading...</h1>
            </section>
        )

    return (
        <main className='course-details'>
            <section className="course-details--header">
                <h1>{course.title}</h1>
                <p>Tutors: {admins}</p>
                <h1>About this course</h1>
                <p>{course.description}</p>
                {isAdmin && <Button text="Edit Course" handleClick={() => { nagigate(`/dashboard/instructedCourses/${id}/editCourse`) }} />}
            </section>
            <section className='course-details--learning-points'>
                <h1>What you'll learn</h1>
                <CourseLearningPoints points={course.courseLearningPoints} />
            </section>
            <section className='course-details--course-points'>
                <h1>Course Content</h1>
                <CourseContent isAdmin={isAdmin} sections={course.courseSections} />
            </section>
        </main>
    )
}