import { useNavigate } from 'react-router-dom';

export default function Button() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dashboard/instructedCourses`);
    }
    
    return (
        <button className="instructed-courses-button" onClick={handleClick}>
            Instructed Courses
        </button>
    )
}