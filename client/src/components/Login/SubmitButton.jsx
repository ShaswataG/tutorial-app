export default function SubmitButton(props) {
    return <button onClick={props.handleSubmit}>{props.text}</button>
}