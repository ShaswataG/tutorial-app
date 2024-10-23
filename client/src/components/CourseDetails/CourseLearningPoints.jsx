import { useEffect, useState } from "react"
import DoneIcon from '@mui/icons-material/Done';

export default function CourseLearningPoints(props) {
    const [points, setPoints] = useState([]);
    
    useEffect(() => {
        setPoints(prevPoints => {
            if (props.points)
            return props.points.map(point => {
                return (
                    <li><DoneIcon /><span>{point}</span></li>
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