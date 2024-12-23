import { useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

import AddContentPopup from './AddContentPopup';

export default function Section({ isAdmin, sectionInfo }) {
    // console.log(`inside Section, props.content: `, props.sectionInfo);
    
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClickOnContent = (event) => {
        console.log(`handleClickOnContent is called`);
        console.log('event.currentTarget.id: ', event.currentTarget.id);
        console.log('event.currentTarget.type: ', event.currentTarget.className);
        if (event.currentTarget.className.search('blog') !== -1) {
            navigate(`/courses/blogs/${event.currentTarget.id}`);
        } else if (event.currentTarget.className.search('lecture') !== -1) {
            navigate(`/courses/lecture/${event.currentTarget.id}`);
        }
    }

    const content = sectionInfo.content.map((item) => {
        return (<ListItemButton sx={{ pl: 4 }} key={item.id} id={item.id} onClick={handleClickOnContent} className={item.type === "lecture" ? "lecture" : "blog" }>
                    <ListItemIcon>
                        {item.type === "lecture" ? <OndemandVideoIcon /> : <ArticleIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} onClick={handleClickOnContent} sx={{ '& .MuiListItemText-primary': { fontSize: '1.25rem' } }}/>
                    {
                        isAdmin
                        &&
                        <Tooltip title="Edit content">
                            <IconButton
                                aria-label='edit content'
                                onClick={() => {}}
                                size='small'
                            >    
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        isAdmin
                        &&
                        <Tooltip title="Delete content">
                            <IconButton
                                aria-label='delete content'
                                onClick={() => {}}
                                size='small'
                            >    
                                <DeleteIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    }
                </ListItemButton>)
    })

    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    
    const [contentPopup, setContentPopup] = useState(false);
    
    const handleAddContent = (sectionId) => {

    }


    return (
        <List
            sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {
                contentPopup
                &&
                <AddContentPopup open={contentPopup} onClose={() => {setContentPopup(false)}} courseId={id} sectionId={sectionInfo.id} nextPosition={sectionInfo.content.length + 1} />
            }
            <ListItemButton>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={sectionInfo.title} sx={{ '& .MuiListItemText-primary': { fontSize: '1.5rem' } }} children={<AddIcon />} />
                {
                    isAdmin
                    &&
                    <Tooltip title="Add content">
                        <IconButton
                            aria-label='add section'
                            onClick={() => { setContentPopup(!contentPopup) }}
                            size='small'
                        >    
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                }
                {
                    isAdmin
                    &&
                    <Tooltip title='Delete section'>
                        <IconButton
                            aria-label='delete section'
                            onClick={() => {}}
                            size='small'
                        >
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                }
                {open ? 
                    <Tooltip title='Collapse section'>
                        <IconButton
                            aria-label='collapse section'
                            onClick={handleClick}
                            size='small'
                        >
                            <ExpandLess /> 
                        </IconButton>
                    </Tooltip>
                    : 
                    <Tooltip title='Expand section'>
                        <IconButton
                            aria-label='expand section'
                            onClick={handleClick}
                            size='small'
                        >
                            <ExpandMore onClick={handleClick} /> 
                        </IconButton>
                    </Tooltip>
                }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton> */}
                    {content}
                </List>
            </Collapse>
        </List>
    );
}
