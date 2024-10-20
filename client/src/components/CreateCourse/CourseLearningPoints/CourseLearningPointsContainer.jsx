import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import LearningPointTextfield from "./LearningPointTextfield";
import AddPointButton from "./AddPointButton";

export default function CourseLearningPointsContainer(props) {
    

    const [textfieldsCollection, setTextfieldsCollection] = useState([]);

    const addPoint = () => {
        setTextfieldsCollection(prevState => {
            return props.courseInfo.learningPoints.map((learningPoint, index) => (<LearningPointTextfield key={index} id={index} handleChange={props.handleChange} value={props.courseInfo.learningPoint} />))
        })
        props.changeCourseInfo(prevCourseInfo => {
            let courseLearningPoints = props.courseInfo.learningPoints;
            courseLearningPoints.push('');
            return {
                ...prevCourseInfo,
                learningPoints: courseLearningPoints
            }
        })
    }

    useEffect(() => {
        setTextfieldsCollection(prevState => {
            return props.courseInfo.learningPoints.map((learningPoint, index) => (<LearningPointTextfield key={index} id={index} handleChange={props.handleChange} value={learningPoint} />))
        })
    }, [props.courseInfo]);

    return (
        <fieldset>
            <figcaption>What you'll learn</figcaption>
            <section className="course-learning-points-container">
                {textfieldsCollection}
            </section>
            <AddPointButton handleClick={addPoint} />     
        </fieldset>
    )
}