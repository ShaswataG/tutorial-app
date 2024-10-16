import Section from './Section';

export default function CourseContent(props) {
    // console.log('inside CourseContent, props.sections:', props.sections);
    const sections = props.sections.map((item) => {
        return <Section key={item.id} sectionInfo={item}/>
    })

    return (
        <>
            <p>{props.sections.length} sections</p>
            {sections}
        </>
    )
}