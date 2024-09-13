import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseLearningPoints from '../components/CourseDetails/CourseLearningPoints';

const baseURL = 'http://localhost:4000';

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await axios.get(`${baseURL}/courses/${id}`);
                setCourse(response.data);
                setAdmins(prevAdmins => {
                    return course.admins.map((admin, index) => {
                        if (index < course.admins.length-1) {
                            return <span>admin, </span>
                        } else {
                            return <span>admin</span>
                        }
                    });
                })
            } catch (error) {

            }
        }
        fetchCourse();
    }, [id]);

    if (Object.keys(course)) return <h1>Loading...</h1>

    return (
        <main className='course-details'>
            <section className="course-details--header">
                <h1>course.id</h1>
                <p>by {admins}</p>
            </section>
            <section className='course-details--learning-points'>
                <CourseLearningPoints points={course.courseLearningPoints} />
            </section>
            <section className='course-details--course-points'>
                
            </section>
        </main>
    )
}