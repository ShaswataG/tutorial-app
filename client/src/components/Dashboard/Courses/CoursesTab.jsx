import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonForce(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{  bgcolor: 'background.paper', padding: '5vw 0' }}>
      <Tabs
        value={props.category}
        onChange={props.changeCategory}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Enrolled Courses" value="enrolledCourses" />
        <Tab label="Instructed Courses" value="instructedCourses" />
        <Tab label="Wishlist" value="wishlist" />
        <Tab label="Archived" value="archived" />
      </Tabs>
    </Box>
  );
}
