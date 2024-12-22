import { useState } from "react"
import DefaultTextField from "./DefaultTextField";
import axios from 'axios';
import SubmitButton from "../../Buttons/SubmitButton";
import useAuthHeader from "../../../hooks/useAuthHeader";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.REACT_APP_BASE_URL;
console.log('baseURL: ', baseUrl);

export default function AddSectionPopup() {

    const getAuthHeader = useAuthHeader();

    const [newSection, setNewSection] = useState({
        title: "",
        position: 0,
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewSection(prevNewSection => {
            return {
                ...prevNewSection,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(baseUrl+'/coueses/section', {
                headers: getAuthHeader()
            })
            console.log('response: ', response);
            toast.success('Added section successfully!', {
                position: "top-center",
                autoClose: 3000, // Standard 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                icon: true, // Disables icon if it appears too large
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to add section', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
        }
    }

    return (
        <div className="add-section-popup">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
            />
            <DefaultTextField label="Section Title" name="title" value={newSection.title} handleChange={handleChange} />
            <SubmitButton text="Add" />
        </div>
    )
}