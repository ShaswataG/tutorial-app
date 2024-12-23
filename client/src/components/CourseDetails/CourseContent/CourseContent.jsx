import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Section from './Section';
import AddSectionButton from '../../Buttons/AddSectionButton';
import AddSectionPopup from './AddSectionPopup';
import axios from 'axios';
import useAuthHeader from '../../../hooks/useAuthHeader';
import AddContentPopup from './AddContentPopup';

const baseURL = process.env.REACT_APP_BASE_URL;

export default function CourseContent({ isAdmin, sections: initialSections = [] }) {
    const getAuthHearer = useAuthHeader();
    const [sections, setSections] = useState(initialSections);
    const { id } = useParams();

    
    const handleDragEnd = async (result) => {
        const { destination, source } = result;
        if (!destination) return;

        const reorderedSections = Array.from(sections);
        const [movedSection] = reorderedSections.splice(source.index, 1);
        reorderedSections.splice(destination.index, 0, movedSection);

        setSections(reorderedSections);
        console.log('sections: ', sections);
        try {
            const response = await axios.patch(baseURL + '/courses/section/update-positions', {
                updatedSections: reorderedSections.map((section, index) => ({
                    id: section.id,
                    position: index + 1,
                }))
            }, {
                headers: getAuthHearer(),
            });
            console.log('response: ', response);
        } catch (error) {
            console.error('Failed to update section positions: ', error);
        }
    }

    useEffect(() => {
        console.log("Sections updated:", sections);
    }, [sections]);

    const [sectionPopup, setSectionPopup] = useState(false);

    return (
        <>
            <p>{sections.length} sections</p>
            <DragDropContext onDragEnd={isAdmin ? handleDragEnd : () => {}}>
                <Droppable droppableId="sections">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {sections.map((section, index) => (
                                <Draggable
                                    key={section.position.toString()}
                                    draggableId={section.position.toString()}
                                    index={index}
                                    isDragDisabled={!isAdmin}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Section isAdmin={isAdmin} sectionInfo={section} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {
                sectionPopup
                &&
                <AddSectionPopup courseId={id} nextPosition={sections.length+1} setSectionPopup={setSectionPopup} />
            }
            {
                isAdmin
                &&
                <AddSectionButton handleClick={() => {setSectionPopup(!sectionPopup)}} text="Add section" />
            }
        </>
    )
}