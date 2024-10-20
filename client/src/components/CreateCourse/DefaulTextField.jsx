import TextField from '@mui/material/TextField';

export default function DefaultTextField(props) {
    return (
        <TextField 
            id="outlined-basic" 
            label={props.label} 
            variant="outlined" 
            onChange={props.handleChange} 
            name={props.name} 
            value={props.value} 
            sx={{
                maxWidth: "50rem"
            }}
        />
    )
}