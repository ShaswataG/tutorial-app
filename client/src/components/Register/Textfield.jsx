export default function Textfield(props) {
    return (
        <>
            <input className="register-textfield" onChange={props.handleChange} type={props.type} placeholder={props.placeholder} />
        </>
    )
}