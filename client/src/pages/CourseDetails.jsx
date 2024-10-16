import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import CourseLearningPoints from '../components/CourseDetails/CourseLearningPoints';
import CourseContent from '../components/CourseDetails/CourseContent/CourseContent';

const baseURL = 'http://localhost:4000';

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadFail, setLoadFail] = useState(false);

    useEffect(() => {
        // console.log(`useEffect is running`);
        async function fetchCourse() {
            try {
                const response = await axios.get(`${baseURL}/courses/${id}`);
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
        fetchCourse();
    }, [id]);

    // if (Object.keys(course)) return <h1>Loading...</h1>

    if (!loading && loadFail) return <h1>Loading Failed</h1>
    else if (loading && !loadFail) return <h1>Loading...</h1>

    return (
        <main className='course-details'>
            <section className="course-details--header">
                <h1>{course.title}</h1>
                <p>Tutors: {admins}</p>
                <h1>About this course</h1>
                <p>{course.description}</p>
            </section>
            <section className='course-details--learning-points'>
                <h1>What you'll learn</h1>
                <CourseLearningPoints points={course.courseLearningPoints} />
            </section>
            <section className='course-details--course-points'>
                <h1>Course Content</h1>
                <CourseContent sections={course.courseSections} />
            </section>
        </main>
    )
}