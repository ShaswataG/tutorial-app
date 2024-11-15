import { useNavigate } from 'react-router-dom';

export default function Button({ text, handleClick }) {
    const navigate = useNavigate();

    // const handleClick = () => {
        // navigate(`/dashboard/instructedCourses`);
    // }
    
    return (
        <button className="edit-course-button" onClick={handleClick}>
            {text}
        </button>
    )
}