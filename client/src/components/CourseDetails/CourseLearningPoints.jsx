import { useEffect, useState } from "react"

export default function CourseLearningPoints(props) {
    const [points, setPoints] = useState([]);
    
    useEffect(() => {
        setPoints(prevPoints => {
            return props.points.map(point => {
                return (
                    <li>{point}</li>
                )
            })
        })
    }, []);
    
    return (
        <div className="course-details--header-admins">
            <ul>
                {points}
            </ul>
        </div>
    )
}