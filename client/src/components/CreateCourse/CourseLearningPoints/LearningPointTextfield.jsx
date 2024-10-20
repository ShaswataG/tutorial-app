import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function LearningPointTextfield(props) {
    return (
        <Input id={`${props.id}`} placeholder="Placeholder" inputProps={ariaLabel} onChange={props.handleChange} value={props.value} />
    )
}