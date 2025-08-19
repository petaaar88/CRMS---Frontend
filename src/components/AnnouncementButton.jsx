import { useState } from 'react';

import Badge from '@mui/material/Badge';

const AnnouncementButton = ({isMarked}) => {

  return (
    <Badge color="error" variant="dot" invisible={!isMarked} className='w-full'>
        <button className=' bg-transparent hover:bg-gray-100 hover:dark:bg-dark-green  border-green-500 darK:border-green-700 border-2 rounded-xl p-2  w-full cursor-pointer'>New Announcement</button>
    </Badge>
  )
}

export default AnnouncementButton