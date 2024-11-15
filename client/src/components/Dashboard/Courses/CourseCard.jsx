import { useNavigate } from "react-router-dom";

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
        <div className="enrolled--course-card" onClick={handleClick} id={props.id}>
            <section className="enrolled--course-card-image">
                <img src={props.courseImage} />
            </section>
            <section className="enrolled--course-card-info">
                <span className="enrolled--course-card-title">{props.courseTitle}</span>
                <span className="enrolled--course-card-admins">
                    {
                        props.courseAdmins.map(courseAdmin => {
                            return (
                                <span>{courseAdmin}</span>
                            )
                        })
                    }
                </span>
            </section>
        </div>
    )
}