import '../styles/helpers/button.css';

export default function Button(props) {
    
    return (
        <button className="button" onClick={props.handleClick}>
            {props.text}
        </button>
    )
}