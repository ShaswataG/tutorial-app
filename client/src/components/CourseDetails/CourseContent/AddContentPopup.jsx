import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const AddContentPopup = ({ open, onClose, courseId, sectionId, nextPosition }) => {
    const navigate = useNavigate();

    const handleCreateBlog = () => {
        onClose();
        navigate(`/instructedCourses/${courseId}/${sectionId}/${nextPosition}/addBlog`);
    };

    const handleCreateLecture = () => {
        onClose();
        navigate('/create-lecture');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                style={{
                    backgroundColor: 'rgb(99 102 241)',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                Add Content
            </DialogTitle>
            <DialogActions
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    gap: '12px',
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleCreateBlog}
                    style={{
                        backgroundColor: 'rgb(99 102 241)',
                        color: 'white',
                        width: '100%',
                    }}
                >
                    Create Blog
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCreateLecture}
                    style={{
                        backgroundColor: 'rgb(99 102 241)',
                        color: 'white',
                        width: '100%',
                    }}
                >
                    Upload Lecture
                </Button>
                <Button
                    onClick={onClose}
                    style={{ color: 'rgb(99 102 241)' }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContentPopup;
