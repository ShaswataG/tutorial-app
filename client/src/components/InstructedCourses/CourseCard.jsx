import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function CourseCard(props) {
    const navigate = useNavigate();

    const handleClick = async (event) => {
        // event.preventDefault();
        // console.log(event.currentTarget);
        // console.log(event.target);
        console.log('Course key', event.currentTarget.id);
        navigate(`/courses/${event.currentTarget.id}`);
    }

    return (
        <div onClick={handleClick} id={props.id} key={props.id} className="course-card">
            <section className="course-card--image">
                <img src={props.courseImage} />
            </section>
            <section className="course-card--info">
                <span className="course-card--title">{props.courseTitle}</span>
                <span className="course-card--admins">
                    {props.courseAdmins.map(courseAdmin => {
                        return (
                            <span key={uuidv4()}>{courseAdmin} </span>
                        )
                    })}
                </span>
                <span className="course-card--price">$ {props.coursePrice}</span>
            </section>
        </div>
    )
}