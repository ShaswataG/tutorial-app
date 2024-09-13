import CourseCard from "./CourseCard";

export default function CoursesContainer(props) {
    const coursesCollection = props.courses.map(course => {
        return <CourseCard id={course.id} courseImage={course.image} courseTitle={course.title} courseAdmins={course.admins} coursePrice={course.price} />
    })
    console.log(coursesCollection);
    
    return (
        <div className="courses-container">
            {props.courses.length > 0 ? coursesCollection : <h1>No courses</h1>}
        </div>
    )
}