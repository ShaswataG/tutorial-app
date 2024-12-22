import axios from 'axios';
import CourseTab from './CoursesTab';
import { useEffect, useState } from 'react';
import CoursesContainer from './CoursesContainer';

const baseURL = process.env.REACT_APP_BASE_URL;

export default function Courses() {
    const [category, setCategory] = useState('Web Development');
    const [courses, setCourses] = useState([]);
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const changeCategory = (event, newValue) => {
        console.log(newValue);
        setCategory(newValue);
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true); 
            setFetchSuccess(false);
            try {
                const response = await axios.get(`${baseURL}/courses`, { params: { category: category } });
                console.log('courses', response.data);
                setCourses(response.data);
                setFetchSuccess(true);
            } catch (error) {
                setFetchSuccess(false);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [category])

    return (
        <section className='courses'>
            <h1>Courses</h1>
            <CourseTab category={category} changeCategory={changeCategory} fetchSuccess={fetchSuccess} />
            {loading && <h1>Loading courses...</h1>}
            {!loading && fetchSuccess && <CoursesContainer courses={courses} />}
            {!loading && !fetchSuccess && <h1>Couldn't fetch courses</h1>}
        </section>
    )
}