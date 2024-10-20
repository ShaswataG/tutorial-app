import Button from '@mui/material/Button';
import AddIcon from '../../../assets/AddIcon.svg';

export default function AddPointButton(props) {
    return (
        <Button variant="contained" onClick={props.handleClick}>
            <img src={AddIcon} alt="Add icon"/>
            <span>Add point</span>
        </Button>
    )
}