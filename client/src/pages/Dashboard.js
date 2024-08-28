import axios from "axios";

const baseURL = 'http://localhost:4000';

export default function Dashboard() {
    const fetchUserInfo = async () => {
        try {
            const data = await axios.get(`${baseURL}/users/${id}`)
        } catch (error) {

        }
    }

    return (
        <>

        </>
    )
}