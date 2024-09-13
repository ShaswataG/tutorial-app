import CoursesTab from "../components/Dashboard/Courses/CoursesTab";
import CoursesContainer from "../components/Dashboard/Courses/CoursesContainer";
import axios from "axios";
import { useEffect, useState } from 'react';

const baseURL = 'http://localhost:4000';

export default function Dashboard() {
    // const fetchUserInfo = async () => {
    //     try {
    //         const data = await axios.get(`${baseURL}/users/${id}`)
    //     } catch (error) {

    //     }
    // }

    const [category, setCategory] = useState('enrolledCourses');

    const [courses, setCourses] = useState([]);
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const changeCategory = async (event, newValue) => {
        setCategory(newValue);
    }
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${baseURL}/courses/${category}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            });
            console.log(response.data);
            setCourses(response.data);
            setFetchSuccess(true);
        } catch (error) {
            setFetchSuccess(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [category])

    return (
        <main className="dashboard">
            <h1>Dashboard</h1>
            <CoursesTab category={category} changeCategory={changeCategory} fetchSuccess={fetchSuccess} />
            {loading && <h1>Loading courses...</h1>}
            {!loading && fetchSuccess && <CoursesContainer courses={courses} />}
            {!loading && !fetchSuccess && <h1>Couldn't fetch courses</h1>}
        </main>
    )
}