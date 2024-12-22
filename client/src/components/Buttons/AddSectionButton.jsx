export default function AddSectionButton({ handleClick, text }) {
    return (
        <button className="add-section-button" onClick={handleClick}>
            {text}
        </button>
    )
}