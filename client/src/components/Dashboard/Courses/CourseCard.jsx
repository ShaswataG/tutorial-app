export default function CourseCard(props) {
    return (
        <div className="enrolled--course-card">
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