import { v4 as uuidv4 } from 'uuid';

export default function CourseCard(props) {
    return (
        <div key={props.id} className="course-card">
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