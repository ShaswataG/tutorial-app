export default function SubmitButton({ handleClick, text }) {
    return (
        <button handleClick={handleClick}>
            {text}
        </button>
    )
}