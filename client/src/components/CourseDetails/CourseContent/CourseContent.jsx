import { useState } from 'react';
import Section from './Section';
import AddSectionButton from '../../Buttons/AddSectionButton';
import AddSectionPopup from './AddSectionPopup';

export default function CourseContent(props) {
    
    const [sectionPopup, setSectionPopup] = useState(false);

    // console.log('inside CourseContent, props.sections:', props.sections);
    const sections = props.sections.map((item) => {
        return <Section key={item.id} sectionInfo={item}/>
    })




    return (
        <>
            <p>{props.sections.length} sections</p>
            {sections}
            {
                sectionPopup
                &&
                <AddSectionPopup />
            }
            <AddSectionButton handleClick={() => {setSectionPopup(!sectionPopup)}} text="Add section" />
        </>
    )
}