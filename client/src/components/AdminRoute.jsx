import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const baseUrl = 'http://localhost:4000';

export default function AdminRoute({ children }) {

    const { courseId } = useParams();
    const token = localStorage.getItem('jwt_token');
    const [isAdmin, setIsAdmin] = useState(null);

    const checkUserPrivileges = async(courseId) => {
        try {
            console.log('courseId: ', courseId);
            const response = await axios.get(`${baseUrl}/courses/admin/isAuth/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                }
            );
            console.log('response.data.isAdmin: ', response.data.isAdmin);
            if (response.data.isAdmin)
                setIsAdmin(true);
            else
                setIsAdmin(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        checkUserPrivileges(courseId);
    }, [courseId]);

    if (isAdmin === null)
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    return isAdmin ? children : <Navigate to="/unauthorized" />
}