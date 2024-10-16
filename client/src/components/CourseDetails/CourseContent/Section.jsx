import { useNavigate } from 'react-router-dom';

import * as React from 'react';
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

export default function Section(props) {
    // console.log(`inside Section, props.content: `, props.sectionInfo);
    
    const navigate = useNavigate();

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

    const content = props.sectionInfo.content.map((item) => {
        return (<ListItemButton sx={{ pl: 4 }} key={item.id} id={item.id} onClick={handleClickOnContent} className={item.type === "lecture" ? "lecture" : "blog" }>
                    <ListItemIcon>
                        {item.type === "lecture" ? <OndemandVideoIcon /> : <ArticleIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} onClick={handleClickOnContent} sx={{ '& .MuiListItemText-primary': { fontSize: '1.25rem' } }}/>
                </ListItemButton>)
    })

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Nested List Items
            //     </ListSubheader>
            // }
        >
            {/* <ListItemButton>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton> */}
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={props.sectionInfo.title} sx={{ '& .MuiListItemText-primary': { fontSize: '1.5rem' } }} />
                {open ? <ExpandLess /> : <ExpandMore />}
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
