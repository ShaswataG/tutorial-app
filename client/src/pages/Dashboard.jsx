import { useNavigate } from "react-router-dom";
import CoursesTab from "../components/Dashboard/Courses/CoursesTab";
import CoursesContainer from "../components/Dashboard/Courses/CoursesContainer";
// import Button from "../components/Dashboard/Button";
import Button from "../helpers/Button";
import axios from "axios";
import { useEffect, useState } from 'react';

const baseURL = process.env.REACT_APP_BASE_URL;

export default function Dashboard() {
    // const fetchUserInfo = async () => {
    //     try {
    //         const data = await axios.get(`${baseURL}/users/${id}`)
    //     } catch (error) {

    //     }
    // }

    const navigate = useNavigate();

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

    const handleInstructedCoursesButtonClick = () => {
        navigate(`/dashboard/instructedCourses`);
    }

    useEffect(() => {
        fetchCourses();
    }, [category])

    return (
        <main className="dashboard">
            <h1>My Dashboard</h1>
            <Button text="Instructed Courses" handleClick={handleInstructedCoursesButtonClick}/>
            <CoursesTab category={category} changeCategory={changeCategory} fetchSuccess={fetchSuccess} />
            {loading && <h1>Loading courses...</h1>}
            {!loading && fetchSuccess && <CoursesContainer courses={courses} />}
            {!loading && !fetchSuccess && <h1>Couldn't load courses</h1>}
        </main>
    )
}