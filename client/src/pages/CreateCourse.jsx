import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseLearningPointsContainer from "../components/CreateCourse/CourseLearningPoints/CourseLearningPointsContainer";
import DefaultTextField from "../components/CreateCourse/DefaulTextField";
import { useState } from "react";
import '../styles/createCourse/createCourse.css';
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const baseURL = 'http://localhost:4000';

export default function CreateCourse() {

    const navigate = useNavigate();

    const [courseInfoVacant, setCourseInfoVacant] = [];
    const [createCourseFailed, setCreateCourseFailed] = useState(false);
    const [courseInfo, setCourseInfo] = useState({
        title: "",
        description: "",
        isPaid: false,
        price: 0    ,
        learningPoints: ["", "", ""],
        level: "beginner",
        category: "",
        image: "",
    });

    const handleChange = async (event) => {
        const { name, value } = event.target;
        // console.log('courseInfo: ', courseInfo);
        setCourseInfo(prevCourseInfo => {
            return {
                ...prevCourseInfo,
                [name]: value
            }
        })
    }

    const handleChangeOnLearningPoint = async (event) => {
        const { id, value } = event.target;
        console.log(typeof(id));
        // console.log('handleChangeOnLearningPoint is being called');
        // console.log('courseInfo: ', courseInfo)
        setCourseInfo(prevCourseInfo => {
            let updatedLearningPoints = courseInfo.learningPoints.map((learningPoint, index) => {
                console.log('id: ', id);
                if (id == index) {
                    console.log(`id == index, index: ${index}`);
                    return value;
                } else {
                    console.log(`id != index, index: ${index}`);
                    return learningPoint;
                }
            });
            // console.log('updatedLearningPoints: ', updatedLearningPoints);
            return {
                ...prevCourseInfo,
                learningPoints: updatedLearningPoints,
            }
        })
    }

    const handleSubmit = async () => {
        // console.log("localStorage.getItem('jwt_token')", localStorage.getItem('jwt_token'));
        try {
            console.log('courseInfo: ', courseInfo);
            if (courseInfo.title.trim() === "" || 
                courseInfo.description.trim() === "" ||
                courseInfo.category.trim() === "" ||
                courseInfo.level.trim() === ""
            ) {
                toast.error('Please fillup all the necessary fields!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
                return;
            }
            const emptyLearningPoint = [];
            courseInfo.learningPoints.forEach(point => {
                if (point.trim() === "") {
                    emptyLearningPoint.push(point);
                }
            })
            if (emptyLearningPoint.length > 0) {
                toast.error('Learning objectives cannot be empty!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
                return;
            }
            const response = await axios.post(baseURL+'/courses', courseInfo, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                }   
            );
            console.log('response', response);
            setCourseInfo({
                title: "",
                description: "",
                isPaid: false,
                price: 0    ,
                learningPoints: ["", "", ""],
                level: "beginner",
                category: "",
                image: "",
            })
            toast.success('Created course successfully!', {
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
            // navigate('/dashboard/instructedCourses')
        } catch (error) {
            console.error('Course creation failed');
            toast.error('Course creation failed', {
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
            setCreateCourseFailed(true);
        }
    }

    return (
        <>
            <form className="create-course-form">
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
                <FormControl 
                    fullWidth 
                    sx={{
                        gap: "40px", 
                        marginBottom: '16px', 
                        maxWidth: "50rem",
                        margin: "auto"
                    }}
                >
                    <DefaultTextField label="Course Title" name="title" value ={courseInfo.title} handleChange={handleChange} />
                    <DefaultTextField label="Course Description" name="description" value={courseInfo.description} handleChange={handleChange} />
                    {/* <DefaultTextField label="Paid Course" name="isPaid" value={courseInfo.isPaid} handleChange={handleChange} /> */}
                    <FormControl 
                        fullWidth
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginBottom: '16px',
                            gap: "40px"
                        }}
                    >
                        {/* Added marginBottom to ensure no overlap */}
                        <FormControl>
                            <InputLabel id="select-course-level">Course Level</InputLabel>
                            <Select
                                labelId="select-course-level"
                                id="select-course-level"
                                name="level"
                                value={courseInfo.level}
                                label="Course Level"
                                onChange={handleChange}
                                sx={{ width: "10rem" }}
                                required
                            >
                                <MenuItem value="beginner">Beginner</MenuItem>
                                <MenuItem value="intermediate">Intermediate</MenuItem>
                                <MenuItem value="advanced">Advanced</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Paid Course</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="isPaid"
                                value={courseInfo.isPaid}
                                label="Paid Course"
                                onChange={handleChange}
                                sx={{ width: "10rem" }}
                                required
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            courseInfo.isPaid 
                            &&
                            <TextField
                                label="Price (in Rupees)"
                                type="number"
                                name="price"
                                value={courseInfo.price}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }} // optional to prevent negative values
                                sx={{
                                    width: "10rem"
                                }}
                            />
                        }
                    </FormControl>
                    <DefaultTextField label="Course Category" name="category" value={courseInfo.category} handleChange={handleChange} required={true} />
                    <CourseLearningPointsContainer courseInfo={courseInfo} changeCourseInfo={setCourseInfo} handleChange={handleChangeOnLearningPoint} />
                </FormControl>
                <section
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}
                >
                    {/* <div className="create-course-warning">
                        {
                            createCourseFailed
                            &&
                            <span>Couldn't create course</span>
                        }
                    </div> */}
                    <Button 
                        sx={{
                            mt: "2.4rem",
                            right: "0"
                        }}
                        variant="contained" 
                        onClick={handleSubmit}>
                        <span>Done</span>
                    </Button>
                </section>
            </form>
        </>
    )
}