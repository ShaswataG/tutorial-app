import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import CoursesContainer from "../components/InstructedCourses/CoursesContainer";
import '../styles/instructedCourses/instructedCourses.css';
import Button from "../helpers/Button";

const baseURL = 'http://localhost:4000';

export default function InstructedCourses() {
    
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleCreateCourseButtonClick = () => {
        navigate('/')
    }

    const fetchCourses = async () => {
        try {
            const response = await axios.get(baseURL+'/courses/instructedCourses', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            });
            console.log(response)
            setCourses(response.data);
            setFetchSuccess(true);
        } catch (error) {
            console.error(error);
            setFetchSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])
    return (
        <main className="instructed-courses">
            <h1>My Courses</h1>
            <Button text="Create new course" handleClick={console.log('test')}/>
            {isLoading && <h1>Loading courses...</h1>}
            {!isLoading && fetchSuccess && <CoursesContainer courses={courses}/>}
            {!isLoading && !fetchSuccess && <h1>Couldn't load courses</h1>}
        </main>
    )
}